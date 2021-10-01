---
layout: post
title: "Managing Services on Google Cloud Run with its Admin API Client in Java"
description: "Examples on using the Google Cloud Run Admin Java API to manage services."
image: "/assets/images/cloudrun+java.png"
date: 2021-10-02 03:50:00 +0530
---

## 1. Overview
In the following examples, we're going to take a look at working with the [Cloud Run Admin API Client Library for Java](https://github.com/googleapis/google-api-java-client-services/tree/main/clients/google-api-services-run/v1).

You must have created or have access to a project on Cloud Run to be able to follow these steps.

## 2. Add the dependency to your project
Get the latest version of the library from Maven Central [here](https://mvnrepository.com/artifact/com.google.apis/google-api-services-run).

## 3. Getting Authenticated

### With Service Account credentials

Create a [Service Account](https://cloud.google.com/iam/docs/service-accounts) from the Google Cloud Console by clicking on the sidebar and navigating to *IAM & Admin* &rarr; *Service Account*. Then click on *Create Service Account* and fill in the requested details. Your service account should have suitable permissions to be able to manage services on Cloud Run.

After creating the service, click on the three dots next to it, then select *Manage Keys* &rarr; *Add Key* &rarr; *Create new key*. Select *JSON* and save the provided file.

```java
String credentialsFilePath = "/path/to/your/json/credentials/file";
GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(credentialsFilePath));
credentials.createScoped("https://www.googleapis.com/auth/cloud-platform");
CloudRun cloudRun = new CloudRun.Builder(new NetHttpTransport(), new GsonFactory(), new HttpCredentialsAdapter(credentials))
        .setRootUrl(config.getRootUrl()).build();
```

## 4. Creating a new Service

```java
String projectId = "your-project-id";
Map<String, String> annotations = Map.of("autoscaling.knative.dev/minScale", "0", // Autoscaling: Minimum instances
        "autoscaling.knative.dev/maxScale", "100", // Autoscaling: Maximum instances
        "run.googleapis.com/cpu-throttling", "false");
ObjectMeta meta = new ObjectMeta()
                    .setAnnotations(annotations)
                    .setNamespace(projectId)
                    .setName("name-of-your-new-service");
ResourceRequirements resources = new ResourceRequirements().setLimits(Map.of("memory", "2Gi", "cpu", "2")); // 2 GigaBytes of RAM and 2 vCPUs
ContainerPort port = new ContainerPort().setContainerPort(80); // Container port you want to expose
Container container = new Container()
                        .setImage("gcr.io/example/example") // URI of your Docker image on Cloud Registry
                        .setPorts(List.of(port))
                        .setResources(resources);
ServiceSpec spec = new ServiceSpec();
spec.setTemplate(new RevisionTemplate()
        .setSpec(new RevisionSpec()
                .setContainers(List.of(crapi))
                .setTimeoutSeconds((int) config.getInstanceTimeoutDuration().toSeconds())
                .setContainerConcurrency(80) // Maximum concurrent requests per container
        )
);
Service service = new Service();
service.setApiVersion("serving.knative.dev/v1")
        .setMetadata(meta)
        .setSpec(spec)
        .setKind("Service");
Service deployedService = cloudRun.namespaces().services()
        .create("namespaces/" + projectId, service)
        .execute();
```

## 5. Deleting an Existing Service
```java
Status status = cloudRun.namespaces().services().delete("namespaces/your-project-id/services/name-of-your-service").execute();
```

## 6. Getting a Service
```java
Service service = cloudRun.namespaces().services().get(serviceName).execute();
```

## 7. Getting All Available Services
```java
List<Service> services = cloudRun.namespaces().services()
                            .list("namespaces/your-project-id")
                            .execute()
                            .getItems();
```

Look at the [official documentation](https://cloud.google.com/run/docs/apis) to know what more you can do with the Cloud Run Admin API.

---
layout: post
title:  "Handwritten Digit Classifier"
---

After a bad [first attempt]({% post_url 2019/2019-06-05-anime-or-cartoon %}) at creating an image classification model, I trained a model on the MNIST database of handwritten digits this time around. This post is actually a jupyter notebook, which you can find [here](https://github.com/ricekot/learning/tree/main/fastai-practical-deep-learning).

## The Project


```python
from fastai.vision import *
```


```python
path = Path('/home/jupyter/projects/data/mnist-handwritten-digits')
```

There was no need of downloading the images this time - I used images provided at the [fastai website](https://course.fast.ai/datasets) from the [MNIST database of handwritten digits](http://yann.lecun.com/exdb/mnist/).

### View Data


```python
np.random.seed(2)
data = ImageDataBunch.from_folder(path, train="training", test="testing", valid_pct=0.2, ds_tfms=get_transforms(do_flip=False), size=24).normalize(mnist_stats)
```


```python
data.classes, data.c, len(data.train_ds), len(data.valid_ds)
```




    (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], 10, 56000, 14000)




```python
data.show_batch(rows = 3, figsize=(8,6))
```


![png](/assets/images/handwritten-digit-classifier_1.png)


### Train Model


```python
learn = cnn_learner(data, models.resnet34, metrics=error_rate)
```


```python
learn.fit_one_cycle(4)
```


<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: left;">
      <th>epoch</th>
      <th>train_loss</th>
      <th>valid_loss</th>
      <th>error_rate</th>
      <th>time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>0.629089</td>
      <td>0.367164</td>
      <td>0.114357</td>
      <td>00:53</td>
    </tr>
    <tr>
      <td>1</td>
      <td>0.281252</td>
      <td>0.141664</td>
      <td>0.042786</td>
      <td>00:51</td>
    </tr>
    <tr>
      <td>2</td>
      <td>0.206387</td>
      <td>0.094406</td>
      <td>0.027857</td>
      <td>00:52</td>
    </tr>
    <tr>
      <td>3</td>
      <td>0.154552</td>
      <td>0.086221</td>
      <td>0.026929</td>
      <td>00:51</td>
    </tr>
  </tbody>
</table>



```python
learn.save('stage-1')
```

### Interpretation


```python
interp = ClassificationInterpretation.from_learner(learn)
```


```python
interp.plot_confusion_matrix()
```


![png](/assets/images/handwritten-digit-classifier_2.png)



```python
interp.plot_top_losses(9, figsize=(7, 6), heatmap=False)
```


![png](/assets/images/handwritten-digit-classifier_3.png)


### Fine Tuning


```python
learn.unfreeze()
learn.fit_one_cycle(1)
```


<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: left;">
      <th>epoch</th>
      <th>train_loss</th>
      <th>valid_loss</th>
      <th>error_rate</th>
      <th>time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>0.056507</td>
      <td>0.020995</td>
      <td>0.006500</td>
      <td>01:02</td>
    </tr>
  </tbody>
</table>



```python
learn.lr_find()
```





    LR Finder is complete, type {learner_name}.recorder.plot() to see the graph.



```python
learn.recorder.plot()
```


![png](/assets/images/handwritten-digit-classifier_4.png)



```python
learn.unfreeze()
learn.fit_one_cycle(2, max_lr=slice(1e-6,1e-4))
```


<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: left;">
      <th>epoch</th>
      <th>train_loss</th>
      <th>valid_loss</th>
      <th>error_rate</th>
      <th>time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>0.051320</td>
      <td>0.019155</td>
      <td>0.005857</td>
      <td>01:03</td>
    </tr>
    <tr>
      <td>1</td>
      <td>0.045109</td>
      <td>0.017994</td>
      <td>0.005571</td>
      <td>01:02</td>
    </tr>
  </tbody>
</table>



```python
learn.save('stage-2')
```

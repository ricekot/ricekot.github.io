---
layout: post
title:  "Anime or Cartoon"
date:   2019-06-05 22:30:30 +0530
categories: general
---

This blog post is actually a jupyter notebook, converted to markdown. If interested, you can find this notebook [here]().

After watching the first lesson video of the fastai course, ['Practical Deep Learning for Coders'](http://course.fast.ai/), I was moved. All those things that seemed would take years for me to achieve were now at my fingertips. 

The thing is, I am a person who likes to front-load on theory, understanding how every small component works in the ultimate big picture. But this approach is very, very frustrating. I started studying from a book called 'Pattern Recognition and Machine Learning' by Christopher M. Bishop. I enjoyed the math at first, but then it started getting on my nerves. In this case, I wanted to learn by _doing_. So, after researching a little online, I finally came across fastai. I like how they first teach _how_ the code works and _then_ they teach _why_ it works. The course is awesome. After the first lesson, I wanted to create an image classifier too, so I made one which classifies a given image into two categories: anime or cartoon.

So before starting, I tried to find out if someone else had also had this grand idea before. And sure enough, there were quite a few! Great minds think alike!

I first found a paper titled 'Are Anime Cartoons?' by 'Chai, Ramesh, Yeo'. You can read it [here](http://cs229.stanford.edu/proj2016/report/ChaiRameshYeo-AreAnimeCartoons-report.pdf). It helped me understand a little about how CNNs actually work. This talked about how CNN models outperform MLP models in the cases where a spatially aware algorithm is necessary to classify images. Good for me, because that's exactly what the first fastai lesson was about. We learnt how to train pretrained models (like resnet34 and resnet50) using the principles of transfer learning and how to further fine-tune these models to better fit our data. [This](https://www.youtube.com/watch?v=VwVg9jCtqaU) video also helped me understand CNNs.

## The Project

### Step 1: Gather Data

The fastai library has a neat feature which allows you to download pictures from a list of their links. So, I created two csv files containing only the links of the anime and cartoon images. For the anime pictures, I used [this](https://www.kaggle.com/alamson/safebooru) dataset. For the cartoon pictures, I made use of the [Fatkun Batch Download Image](https://chrome.google.com/webstore/detail/fatkun-batch-download-ima/nnjjahlikiabnchcpehcpkdeckfgnohf) chrome browser extension to extract about 250 image links.

I feel that both the datasets could have been better curated for this project.

Moving on, I uploaded the csv files to my google cloud platform server and with the help of the fastai library downloaded the images into two separate folders.


```python
%reload_ext autoreload
%autoreload 2
%matplotlib inline
```


```python
from fastai.vision import *
from fastai.metrics import error_rate
```


```python
bs = 64
```


```python
path = Path('/home/jupyter/tutorials/data/anime-vs-cartoon')
```


```python
classes = ['anime','cartoon']
for c in classes:
    print(c)
    folder = c
    file = 'urls_%s.csv' % c
    dest = path/folder
    dest.mkdir(parents=True, exist_ok=True)
    download_images(path/file, dest, max_pics=1000)
    verify_images(path/c, delete=True, max_size=500)
```

  anime

  <div>
      <style>
          /* Turns off some styling */
          progress {
              /* gets rid of default border in Firefox and Opera. */
              border: none;
              /* Needs to be in here for Safari polyfill so background images work as expected. */
              background-size: auto;
          }
          .progress-bar-interrupted, .progress-bar-interrupted::-webkit-progress-bar {
              background: #F44336;
          }
      </style>
    <progress value='1000' class='' max='1000', style='width:300px; height:20px; vertical-align: middle;'></progress>
    100.00% [1000/1000 01:27<00:00]
  </div>

  <div>
      <style>
          /* Turns off some styling */
          progress {
              /* gets rid of default border in Firefox and Opera. */
              border: none;
              /* Needs to be in here for Safari polyfill so background images work as expected. */
              background-size: auto;
          }
          .progress-bar-interrupted, .progress-bar-interrupted::-webkit-progress-bar {
              background: #F44336;
          }
      </style>
    <progress value='1000' class='' max='1000', style='width:300px; height:20px; vertical-align: middle;'></progress>
    100.00% [1000/1000 00:09<00:00]
  </div>
  <br>
  <div style="overflow: auto; width:900px; height:250px;">
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000091.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000670.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000856.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000806.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000901.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000098.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000659.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000150.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000482.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000892.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000605.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000599.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000397.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000400.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000453.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000282.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000789.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000290.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000436.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000922.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000808.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000896.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000800.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000507.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000435.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000823.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000624.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000178.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000999.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000350.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000500.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000199.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000243.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000626.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000916.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000228.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000768.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000799.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000269.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000745.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000490.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000527.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000616.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000937.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000109.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000112.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000053.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000679.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000809.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000945.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000783.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000197.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000169.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000013.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000699.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000804.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000595.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000217.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000454.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000372.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000898.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000635.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000345.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000419.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000117.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000649.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000456.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000872.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000641.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000132.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000678.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000906.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000657.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000009.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000586.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000881.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000283.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000646.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000175.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000989.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000785.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000846.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000601.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000996.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000854.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000695.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000528.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000177.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000287.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000798.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000147.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000237.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000049.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000149.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000617.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000017.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000775.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000054.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000212.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000143.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000153.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000207.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000413.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000531.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000716.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000648.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000920.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000014.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000862.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000389.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000970.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000031.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000877.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000686.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000483.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000943.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000557.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000826.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000190.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000064.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000828.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000209.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000803.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000063.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000941.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000807.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000115.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000357.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000019.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000097.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000793.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000315.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000146.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000385.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000630.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000870.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000831.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000687.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000526.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000297.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000476.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000046.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000433.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000915.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000469.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000754.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000406.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000158.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000480.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000278.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000072.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000301.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000951.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000568.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000181.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000959.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000004.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000591.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000761.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000628.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000773.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000709.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000928.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000669.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000969.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000717.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000594.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000341.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000719.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000355.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000258.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000781.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000412.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000319.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000277.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000347.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000820.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000732.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000764.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000225.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000926.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000157.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000113.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000336.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000142.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000978.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000661.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000267.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000583.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000056.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000579.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000919.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000472.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000696.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000571.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000815.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000510.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000383.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000623.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000873.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000703.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000596.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000776.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000560.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000795.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000067.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000108.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000280.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000749.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000359.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000274.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000116.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000450.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000927.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000364.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000332.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000774.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000744.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000135.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000838.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000284.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000651.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000238.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000393.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000437.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000057.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000565.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000693.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000987.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000851.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000180.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000249.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000593.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000758.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000940.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000037.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000459.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000666.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000080.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000318.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000204.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000509.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000030.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000762.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000491.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000837.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000250.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000479.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000880.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000740.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000759.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000025.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000743.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000756.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000813.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000457.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000310.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000076.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000753.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000850.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000858.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000398.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000544.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000408.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000214.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000562.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000778.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000294.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000957.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000033.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000577.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000216.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000829.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000272.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000035.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000168.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000077.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000138.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000636.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000984.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000307.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000834.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000494.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000099.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000447.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000477.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000885.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000422.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000816.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000367.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000001.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000652.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000127.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000390.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000381.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000268.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000960.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000140.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000613.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000615.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000705.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000452.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000924.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000680.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000573.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000264.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000211.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000141.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000665.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000524.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000939.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000656.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000110.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000252.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000597.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000770.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000189.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000226.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000931.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000549.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000039.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000144.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000300.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000543.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000763.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000535.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000095.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000697.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000698.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000681.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000119.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000061.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000416.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000235.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000281.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000944.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000718.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000011.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000723.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000833.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000478.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000295.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000517.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000519.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000735.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000094.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000879.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000769.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000766.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000691.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000588.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000417.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000434.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000569.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000611.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000883.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000461.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000701.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000428.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000505.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000513.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000796.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000836.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000215.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000466.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000622.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000551.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000821.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000511.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000730.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000070.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000198.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000418.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000240.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000251.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000688.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000465.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000689.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000936.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000221.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000183.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000185.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000292.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000609.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000015.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000396.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000481.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000468.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000392.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000448.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000122.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000706.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000257.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000802.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000772.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000819.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000948.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000052.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000621.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000090.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000446.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000096.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000042.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000455.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000073.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000520.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000645.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000137.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000844.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000008.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000632.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000825.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000972.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000658.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000805.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000133.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000362.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000071.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000848.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000610.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000374.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000932.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000388.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000218.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000567.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000581.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000000.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000865.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000871.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000771.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000126.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000352.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000608.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000375.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000484.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000684.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000048.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000895.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000878.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000692.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000582.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000065.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000968.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000797.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000604.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000306.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000159.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000460.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000958.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000700.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000471.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000230.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000449.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000650.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000172.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000518.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000160.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000365.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000193.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000514.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000886.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000677.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000538.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000303.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000683.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000275.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000241.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000852.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000977.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000451.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000020.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000738.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000463.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000164.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000058.jpeg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000344.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000532.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000340.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000794.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000913.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000702.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000486.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000148.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000068.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000270.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000633.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000124.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000746.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000923.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000542.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000576.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000442.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000676.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000260.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000715.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000685.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000006.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000760.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000156.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000131.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000222.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000547.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000151.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000139.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000219.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000867.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000907.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000256.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000248.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000536.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000779.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000812.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000653.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000997.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000986.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000737.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000722.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000938.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000521.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000378.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000487.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000929.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000261.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000265.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000022.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000330.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000358.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000047.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000921.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000152.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000382.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000634.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000120.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000584.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000930.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000187.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000234.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000244.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000675.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000949.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000339.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000545.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000002.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000900.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000704.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000629.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000239.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000296.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000118.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000356.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000708.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000432.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000368.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000136.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000791.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000827.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000707.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000458.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000874.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000672.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000229.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000041.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000027.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000694.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000166.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000580.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000366.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000489.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000003.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000955.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000247.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000734.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000391.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000210.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000840.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000897.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000170.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000273.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000917.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000954.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000123.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000203.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000334.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000445.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000342.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000005.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000890.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000346.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000731.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000830.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000293.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000843.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000869.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000976.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000713.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000971.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000333.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000606.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000036.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000499.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000255.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000012.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000439.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000585.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000857.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000173.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000887.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000475.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000032.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000911.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000787.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000254.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000101.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000102.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000903.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000566.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000845.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000426.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000414.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000640.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000062.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000194.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000899.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000876.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000790.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000810.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000192.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000592.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000589.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000714.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000673.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000145.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000288.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000236.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000059.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000736.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000953.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000427.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000912.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000200.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000975.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000952.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000590.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000786.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000387.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000727.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000467.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000473.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000470.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000868.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000086.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000105.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000134.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000174.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000918.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000902.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000338.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000512.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000220.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000253.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000182.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000563.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000818.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000712.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000934.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000335.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000155.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000962.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000914.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000443.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000213.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000822.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000671.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000051.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000726.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000780.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000162.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000612.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000947.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000561.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000044.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000380.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000304.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000994.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000411.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000742.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000298.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000935.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000291.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000007.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000710.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000587.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000430.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000725.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000361.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000546.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000966.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000767.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000602.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000905.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000741.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000832.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000508.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000176.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000801.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000331.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000060.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000407.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000103.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000961.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000379.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000245.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000981.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000995.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000167.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000853.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000055.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000208.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000721.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000504.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000663.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000279.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000724.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000974.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000728.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000910.png'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000163.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000515.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000106.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000925.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000619.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000690.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000266.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000130.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000271.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000191.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000859.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000963.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000128.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000104.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000462.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000893.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000038.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000093.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000824.jpg'>
      cannot identify image file <_io.BufferedReader name='/home/jupyter/tutorials/data/anime-vs-cartoon/anime/00000066.png'>
    </div>
<br>
cartoon
<br>
<div>
    <style>
        /* Turns off some styling */
        progress {
            /* gets rid of default border in Firefox and Opera. */
            border: none;
            /* Needs to be in here for Safari polyfill so background images work as expected. */
            background-size: auto;
        }
        .progress-bar-interrupted, .progress-bar-interrupted::-webkit-progress-bar {
            background: #F44336;
        }
    </style>
  <progress value='256' class='' max='256', style='width:300px; height:20px; vertical-align: middle;'></progress>
  100.00% [256/256 00:02<00:00]
</div>

<div>
    <style>
        /* Turns off some styling */
        progress {
            /* gets rid of default border in Firefox and Opera. */
            border: none;
            /* Needs to be in here for Safari polyfill so background images work as expected. */
            background-size: auto;
        }
        .progress-bar-interrupted, .progress-bar-interrupted::-webkit-progress-bar {
            background: #F44336;
        }
    </style>
  <progress value='272' class='' max='272', style='width:300px; height:20px; vertical-align: middle;'></progress>
  100.00% [272/272 00:00<00:00]
</div>
<br>

For some reason a lot of anime image URLs were broken. Good thing we verified the images.

### Step 2: Transform & View Data

Before training our model, we must normalise our images. The fastai library provides a really cool class called 'ImageDataBunch' which allows us to do operations on our image datasets in bulk. You can find out more about this class in the fastai docs [here](https://docs.fast.ai/vision.data.html).


```python
np.random.seed(2)
data = ImageDataBunch.from_folder(path, train=".", valid_pct=0.2, ds_tfms=get_transforms(),
                                  size=224, num_workers=4).normalize(imagenet_stats)
```


```python
data.show_batch(rows = 3, figsize=(8,6))
```


![png](/assets/images/anime-or-cartoon_1.png)



```python
data.classes, data.c, len(data.train_ds), len(data.valid_ds)
```




    (['anime', 'cartoon'], 2, 421, 105)



### Step 3: Train Model

We can finally start training our model. For this project I decided to go with the ResNet34 model.


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
      <td>0.735565</td>
      <td>0.621040</td>
      <td>0.380952</td>
      <td>00:07</td>
    </tr>
    <tr>
      <td>1</td>
      <td>0.421396</td>
      <td>0.046641</td>
      <td>0.009524</td>
      <td>00:03</td>
    </tr>
    <tr>
      <td>2</td>
      <td>0.296799</td>
      <td>0.016185</td>
      <td>0.009524</td>
      <td>00:03</td>
    </tr>
    <tr>
      <td>3</td>
      <td>0.222645</td>
      <td>0.011620</td>
      <td>0.009524</td>
      <td>00:03</td>
    </tr>
  </tbody>
</table>



```python
learn.save('stage-1')
```

### Step 4: Interpretation


```python
interp = ClassificationInterpretation.from_learner(learn)

losses, idxs = interp.top_losses()

len(data.valid_ds)==len(losses)==len(idxs)
```




    True




```python
interp.plot_confusion_matrix()
```


![png](/assets/images/anime-or-cartoon_2.png)



```python
interp.plot_top_losses(4, figsize=(6, 6), heatmap=False)
```


![png](/assets/images/anime-or-cartoon_3.png)


Looking at the above pictures, it makes sense why our model classified these incorrectly! Even a casual anime viewer would be confused when looking at these pictures. Once again, please excuse me for my poorly curated data sets.

### Step 5: Fine Tuning

Let's see if we can reduce the error rate by choosing a range of learning rate optimum for this model.


```python
learn.unfreeze()
learn.fit_one_cycle(1)
learn.lr_find()
learn.recorder.plot()
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
      <td>0.102109</td>
      <td>0.044281</td>
      <td>0.019048</td>
      <td>00:04</td>
    </tr>
  </tbody>
</table>






    LR Finder is complete, type {learner_name}.recorder.plot() to see the graph.



![png](/assets/images/anime-or-cartoon_4.png)



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
      <td>0.040849</td>
      <td>0.050569</td>
      <td>0.019048</td>
      <td>00:04</td>
    </tr>
    <tr>
      <td>1</td>
      <td>0.036746</td>
      <td>0.045013</td>
      <td>0.019048</td>
      <td>00:04</td>
    </tr>
  </tbody>
</table>


The train_loss variable has gone down considerably. This probably means that the model is overfitting the training data. Let's just revert back to the old model (before the fine tuning).


```python
learn.load('stage-1')
```



<div style="overflow: auto; width:; height:200px;">

Learner(data=ImageDataBunch;

Train: LabelList (421 items)
x: ImageList
Image (3, 224, 224),Image (3, 224, 224),Image (3, 224, 224),Image (3, 224, 224),Image (3, 224, 224)
y: CategoryList
cartoon,cartoon,cartoon,cartoon,cartoon
Path: /home/jupyter/tutorials/data/anime-vs-cartoon;

Valid: LabelList (105 items)
x: ImageList
Image (3, 224, 224),Image (3, 224, 224),Image (3, 224, 224),Image (3, 224, 224),Image (3, 224, 224)
y: CategoryList
anime,anime,anime,cartoon,cartoon
Path: /home/jupyter/tutorials/data/anime-vs-cartoon;

Test: None, model=Sequential(
  (0): Sequential(
    (0): Conv2d(3, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False)
    (1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (2): ReLU(inplace)
    (3): MaxPool2d(kernel_size=3, stride=2, padding=1, dilation=1, ceil_mode=False)
    (4): Sequential(
      (0): BasicBlock(
        (conv1): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (1): BasicBlock(
        (conv1): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (2): BasicBlock(
        (conv1): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
    )
    (5): Sequential(
      (0): BasicBlock(
        (conv1): Conv2d(64, 128, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (downsample): Sequential(
          (0): Conv2d(64, 128, kernel_size=(1, 1), stride=(2, 2), bias=False)
          (1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        )
      )
      (1): BasicBlock(
        (conv1): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (2): BasicBlock(
        (conv1): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (3): BasicBlock(
        (conv1): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
    )
    (6): Sequential(
      (0): BasicBlock(
        (conv1): Conv2d(128, 256, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (downsample): Sequential(
          (0): Conv2d(128, 256, kernel_size=(1, 1), stride=(2, 2), bias=False)
          (1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        )
      )
      (1): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (2): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (3): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (4): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (5): BasicBlock(
        (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
    )
    (7): Sequential(
      (0): BasicBlock(
        (conv1): Conv2d(256, 512, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (downsample): Sequential(
          (0): Conv2d(256, 512, kernel_size=(1, 1), stride=(2, 2), bias=False)
          (1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        )
      )
      (1): BasicBlock(
        (conv1): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (2): BasicBlock(
        (conv1): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace)
        (conv2): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
    )
  )
  (1): Sequential(
    (0): AdaptiveConcatPool2d(
      (ap): AdaptiveAvgPool2d(output_size=1)
      (mp): AdaptiveMaxPool2d(output_size=1)
    )
    (1): Flatten()
    (2): BatchNorm1d(1024, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (3): Dropout(p=0.25)
    (4): Linear(in_features=1024, out_features=512, bias=True)
    (5): ReLU(inplace)
    (6): BatchNorm1d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (7): Dropout(p=0.5)
    (8): Linear(in_features=512, out_features=2, bias=True)
  )
), opt_func=functools.partial(<class 'torch.optim.adam.Adam'>, betas=(0.9, 0.99)), loss_func=FlattenedLoss of CrossEntropyLoss(), metrics=[<function error_rate at 0x7f034f175f28>], true_wd=True, bn_wd=True, wd=0.01, train_bn=True, path=PosixPath('/home/jupyter/tutorials/data/anime-vs-cartoon'), model_dir='models', callback_fns=[functools.partial(<class 'fastai.basic_train.Recorder'>, add_time=True, silent=False)], callbacks=[], layer_groups=[Sequential(
  (0): Conv2d(3, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False)
  (1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (2): ReLU(inplace)
  (3): MaxPool2d(kernel_size=3, stride=2, padding=1, dilation=1, ceil_mode=False)
  (4): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (5): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (6): ReLU(inplace)
  (7): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (8): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (9): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (10): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (11): ReLU(inplace)
  (12): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (13): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (14): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (15): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (16): ReLU(inplace)
  (17): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (18): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (19): Conv2d(64, 128, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
  (20): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (21): ReLU(inplace)
  (22): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (23): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (24): Conv2d(64, 128, kernel_size=(1, 1), stride=(2, 2), bias=False)
  (25): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (26): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (27): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (28): ReLU(inplace)
  (29): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (30): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (31): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (32): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (33): ReLU(inplace)
  (34): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (35): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (36): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (37): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (38): ReLU(inplace)
  (39): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (40): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
), Sequential(
  (0): Conv2d(128, 256, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
  (1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (2): ReLU(inplace)
  (3): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (4): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (5): Conv2d(128, 256, kernel_size=(1, 1), stride=(2, 2), bias=False)
  (6): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (7): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (8): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (9): ReLU(inplace)
  (10): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (11): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (12): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (13): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (14): ReLU(inplace)
  (15): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (16): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (17): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (18): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (19): ReLU(inplace)
  (20): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (21): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (22): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (23): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (24): ReLU(inplace)
  (25): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (26): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (27): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (28): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (29): ReLU(inplace)
  (30): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (31): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (32): Conv2d(256, 512, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
  (33): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (34): ReLU(inplace)
  (35): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (36): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (37): Conv2d(256, 512, kernel_size=(1, 1), stride=(2, 2), bias=False)
  (38): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (39): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (40): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (41): ReLU(inplace)
  (42): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (43): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (44): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (45): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (46): ReLU(inplace)
  (47): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
  (48): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
), Sequential(
  (0): AdaptiveAvgPool2d(output_size=1)
  (1): AdaptiveMaxPool2d(output_size=1)
  (2): Flatten()
  (3): BatchNorm1d(1024, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (4): Dropout(p=0.25)
  (5): Linear(in_features=1024, out_features=512, bias=True)
  (6): ReLU(inplace)
  (7): BatchNorm1d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (8): Dropout(p=0.5)
  (9): Linear(in_features=512, out_features=2, bias=True)
)], add_time=True, silent=None)
</div>
<br>


### Step 6: Testing

This step was a lot of fun! I tested the model on a lot of images from my favourite anime and cartoons, and the thing that surprised me the most was, the model was _actually_ working! I was a little sceptical at first, but after testing it a couple of times I was pretty satisfied with it's performance. It seemed to guess the image correctly most of the time, save for a few instances. For example, it incorrectly identified a scene from [Boku no Hero Academia](https://myanimelist.net/manga/75989/Boku_no_Hero_Academia) as a cartoon.


```python
learn.export()
```


```python
img = open_image(Path('/home/jupyter/tutorials/data/test/bnha3.jpg'))
img
```




![png](/assets/images/anime-or-cartoon_5.png)




```python
learn = load_learner(path)
learn.predict(img)
```




    (Category cartoon, tensor(1), tensor([0.1647, 0.8353]))



As you can see, the model isn't perfect! Also, there are many things that I do not understand very well yet, like
* the behaviour of the error_rate variable above (why does it become constant?)
* how do I properly interpret the loss vs learning rate plot?
* how can I ensure that my data set is good enough? (exploring concepts like normalisation)
* and some more

I will try to find the answers to these questions as I progress further in the course, discuss in the forums etc.. I will post whatever I learn here on this blog.

### Step 7: Put Model in Production

This was something I made just for fun, as a project to test out what I had learnt. I have no plans to put this in production anytime soon, for this is in no means perfect and is only a trivial application of deep learning. However, I may eventually create a very basic android app just to see how I can integrate deep learning with an app running on a mobile device.

## Future Projects

I have only just begun learning deep learning, but I am already having a lot of fun. You can expect the blog posts to get more frequent, because I have decided to document each step of my journey here. If you have any comments or questions, feel free to drop an email to me!

---
layout: post
title:  "Hold-ups - Gradient Descent"
---

I will be posting stuff that I think is holding me back from moving forward in the course I'm currently following, under the title 'Hold-ups'. This is so that I can revisit these posts later and study these topics in depth.

### Some questions I solved
1. Why does subtracting the value lr * ∇f from x bring us close to that value of x for which x is minimum? Basically, what is ∇f?
    * I got a satisfactory answer from the books Thomas' Calculus and Ian Goodfellow's Deep Learning. But these in turn led me to ask the following questions:
2. How does minimising the directional derivative at a point help us realise the direction of steepest descent?
3. Why does ∇f always point in the direction of steepest ascent?
    * I was able to answer these two questions after watching [this great Khan Academy video](https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/gradient-and-directional-derivatives/v/why-the-gradient-is-the-direction-of-steepest-ascent).

### Some questions I have
1. What is Automatic Differentiation? How does it work?
    * To read:
        * [A Hitchhiker's Guide to Automatic Differentiation [arXiv:1411.0583]](https://arxiv.org/abs/1411.0583)
        * [A Review of automatic differentiation and its efficient implementation [arXiv:1811.05031]](https://arxiv.org/abs/1811.05031)
        * [Automatic Differentiation of Algorithms for Machine Learning [arXiv:1404.7456]](https://arxiv.org/abs/1404.7456)
        * [CSC321 Lecture 10: Automatic Differentiation by Roger Grosse](https://www.cs.toronto.edu/~rgrosse/courses/csc321_2018/slides/lec10.pdf)
2. What is backpropagation?
3. How is autograd implemented in PyTorch?
    * To read: 
        * [PyTorch Autograd - Understanding the heart of PyTorch’s magic](https://towardsdatascience.com/pytorch-autograd-understanding-the-heart-of-pytorchs-magic-2686cd94ec95)
        * [PyTorch Docs](https://pytorch.org/docs/stable/autograd.html)
        * [PyTorch Autograd Tutorial](https://pytorch.org/tutorials/beginner/blitz/autograd_tutorial.html)
4. What does it really mean when we write `loss.backward()` in the lesson2-sgd notebook?

### Some more stuff to do
1. Check out the site [explained.ai](https://www.explained.ai) and definitely read [The Matrix Calculus You Need For Deep Learning [arXiv:1802.01528]](https://arxiv.org/abs/1802.01528)

A/N: I have added the ability to comment on posts now. Feel free to point out any mistakes, ask questions, or just say hi!
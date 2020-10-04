---
layout: post
title: Math is Fiction
tags: notes math-f241
contains_math: true
---

3b1b said in [his TED talk](https://youtu.be/s_L-fp8gDzY?t=545) that Math is like a Mystery story. I'll be trying to solve a question today with very little prior knowledge and will be listing out my thought process and internet search history.

>If the extremal of the functional
>
>$$
>I[y(x)] = \int_{0}^{2}\frac{(y')^2}{x}dx
>$$ 
>
>subject to the conditions $y(0) = \alpha$, $y(2) = \beta$ is a parabola passing through the origin, find the values of $\alpha$ and $\beta$ .

```
the problem +--> extremal +--> smooth functions
            |             +--> Euler equations
            |             +--> extremum conditions
            |             +--> variational calculus
            |
            +--> functional
            +--> calculus of variations +--> Euler-Lagrange equation +--> solving second order partial differential equations
```

what is an extremal?
- A smooth solution of the Euler equation, which is a necessary extremum condition in the problem of variational calculus.

a solution must be a function  
what is a smooth function?
- my knowledge: a function that is infinitely differentiable
- [wikipedia](https://en.wikipedia.org/wiki/Smoothness): In mathematical analysis, the smoothness of a function is a property measured by the number of continuous derivatives it has over some domain. At the very minimum, a function could be considered "smooth" if it is differentiable everywhere (hence continuous). At the other end, it might also possess derivatives of all orders in its domain, in which case it is referred to as a C-infinity function (or  $C^\infty$ function).

what is the Euler equation?
- [nasa](https://www.grc.nasa.gov/WWW/K-12/airplane/eulereqs.html): The Euler Equations describe how the velocity, pressure and density of a moving fluid are related. They are a set of coupled differential equations and they can be solved for a given flow problem by using methods from calculus. (added later:) The equation we're concerned with is the Euler-Lagrange equation.

what is an extremum condition?
- my knowledge: one of the conditions for which a function attains it's maximum or minimum value in it's domain (or a given range)

what is variational calculus?
- [wikipedia](https://en.wikipedia.org/wiki/Calculus_of_variations): The calculus of variations is a field of mathematical analysis that uses variations, which are small changes in functions and functionals, to find maxima and minima of functionals: mappings from a set of functions to the real numbers.

Cool, now we also know what functionals are.
In a little more detail,
- [wikipedia](https://en.wikipedia.org/wiki/Higher-order_function): In mathematics and computer science, a higher-order function is a function that does at least one of the following:
    - takes one or more functions as arguments (i.e. procedural parameters),
    - returns a function as its result.
All other functions are first-order functions. In mathematics higher-order functions are also termed operators or functionals. The differential operator in calculus is a common example, since it maps a function to its derivative, also a function. NOTE: (added later) functionals != higher order functions. 

wow, we also have functionals in some programming languages!  
Here's an example in java:  
```java
Function<IntUnaryOperator, IntUnaryOperator> twice = f -> f.andThen(f);
twice.apply(x -> x + 3).applyAsInt(7); // 13
```

what's the difference between a functional and a composite function?
- [stackexchange](https://math.stackexchange.com/q/2836265): Composition of functions is when you "feed" the result of one function into another function to produce yet a third function. A functional, on the other hand, is when you "feed" a function -- a whole function, not just the value of the function at a specific point -- into some kind of "machine" that assigns a single numerical value to it. An example is a definite integral. Notice that when you apply a functional to a function, the result is a single number. That's what is meant by the statement that the value of F(f) depends, in some sense, on the "entirety" of f(x) in a particular domain.

For example, here are some examples of functionals:

- $F(f)=\int_{0}^{6} f(x)dx$. For $f(x)=x^2$, we'd have that $F(f)=72$.
- $G(f)=max \\{ f(x) \vert −5\le x\le 3 \\} $. For $f(x)=x^2$, we'd have that $G(f)=25$.
- $H(f)=$ the number of critical points of $f(x)$ on $[−5,3]$. For $f(x)=x^2$, we'd have $H(f)=1$.

Notice also that in each of these examples the definition of the functional requires some choice of interval; different choices would lead to different results. Finally, a particular functional may only be defined for certain classes of functions; for example, neither of the examples F and G above are not defined for a discontinuous function with a vertical asymptote at $x=2$. So in defining a function, one usually needs to limit one's attention to some category of "nice" or "good" functions on which the functional will operate.

(reference: mweiss <https://math.stackexchange.com/users/124095/mweiss>, What is the difference between a functional and a composite function?, URL (version: 2018-06-29): <https://math.stackexchange.com/q/2836265>)

Turns out that the wikipedia example was for higher order functions, not functionals. A differential operator alone is not a functional. A differential operator when also evaluated at a point is a functional. 

The problem is starting to make more sense now. We have been given a functional 

$$ 
I[y(x)] = \int_{0}^{2}\frac{(y')^2}{x}dx
$$

So if I have $y(x) = x^2$, the output of my functional will be 2, i.e. $I[x^2] = 2$.
Okay. The problem says that the extremal of this functional, i.e., the input function that gives the maximum or minimum value is a parabola that passes through the origin. If $e(x)$ is the extremal for the functional, we have to find $e(0)$ and $e(2)$. But wait a second. If the extremal function passes through the origin, shouldn't $e(0) = 0$? Well, that was easy. So we just have to find $e(2)$ now.

how to find the extremal of a functional?
- [this video](https://www.youtube.com/watch?v=sqNlxuSKd98) was the top result

Euler-Lagrange equation derivation
- [this video](https://www.youtube.com/watch?v=sFqp2lCEvwM) explains it pretty well.
The derivation is very smart, I was impressed!

We assume $y(x)$ to be an extremal of the functional

$$
I = \int_{x1}^{x2} f(x, y(x), y'(x)) \tag{i}
$$

We also have the boundary conditions for the curve $y(x)$: $y(x_1) = y_1$ and $y(x_2) = y_2$.
Then, we consider all the curves that have the same boundary conditions, that is, the family of curves to which $y(x)$ belongs,

$$
z(x) = y(x) + \epsilon \eta (x) \tag{ii}
$$

where, $\eta(x)$ is an arbitrary function such that $\eta(x1) = \eta(x2) = 0$ and $\epsilon$ is an arbitrary constant.
Okay. Now, when we put the function $z(x)$ into the functional $I$, it should return a single value, right? Yes. It does exactly that. This value is in terms of $\epsilon$. If you look carefully at the equation of the family of curves, you will notice that $z(x)$ will be an extremal of $I$ when $\epsilon = 0$. Therefore, we have, $\left.\frac {dI}{d\epsilon}\right|_0 = 0$. Thus, we can put in the RHS of $(i)$ into this equation and get the condition for an input function to be an extremal (refer to the video for the calculations) and we end up with the Euler-Lagrange equation: 

$$
\frac {\delta f}{\delta y} - \frac {d}{dx}\left(\frac{\delta f}{\delta y\,'}\right) \tag{iii}
$$

Let's get back to the problem. We put the function $e(x) = \frac{(y\,')^2}{x}$ into the Euler-Lagrange equation, and we get the following second order differential equation: 

$$
e\,'' - \frac {e\,'}{x} = 0 \tag{iv}
$$

- how to solve a second order differential equation
found [this pdf](http://www.personal.psu.edu/sxt104/class/Math251/Notes-2nd%20order%20ODE%20pt1.pdf)

substitute $e\,'$ for some $u$ and solve like a first order differential equation. The solution we get is: 

$$
e(x) = mx^2 + n
$$

where m and n are real constants.

using the boundary conditions, we get that $e(2) = \beta = 4m$, that is $\beta \in \mathbb{R}$ and we already know that $\alpha = 0$. The problem has been solved.

Phew! I must admit it, I did not think this would take me an entire day to solve. Anyways, treating this problem like a mystery story allowed me to enjoy the entire process.

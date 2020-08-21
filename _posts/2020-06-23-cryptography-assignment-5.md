---
layout: post
title: Solving Cryptography Problems - 5
contains_math: true
---

Here's the first problem:

Using Shamir's $(2, 4)$ secret sharing scheme with the parameter $p=17$, we get

$$
D_1 = 12, D_4 = 3
$$

What is the shared secret $D$?

- What is Shamir's secret sharing scheme?  
I read Adi Shamir's [How to Share a Secret](https://cs.jhu.edu/~sdoshi/crypto/papers/shamirturing.pdf), and was able to get a decent understanding of the scheme he proposed.

    This is a scheme proposed for _sharing_ secrets, not encrypting them. We basically divide our secret $D$ into $n$ parts, such that we only require $k$ parts to recover the secret. Even if an adversary is able to steal $k-1$ parts, they will not be able to read our secret. This is done by constructing a $(k-1)$ - degree polynomial $q(x)$ (so it will have $k$ coefficients) such that $q(0) = a_0 = D$ and $q(i) = D_i \,\forall\, i \in \\{1, 2, \ldots , n\\}$. Therefore, we can obtain the value of all the $k$ coefficients in the polynomial (and hence the secret $D$) only if we are able to write $k$ or more equations (that is, we must have at least $k$ of the $n$ $D_i$s). All these values are computed modulo a prime number $p$ that is chosen such that it is bigger than $n$.

Since $k=2$, our polynomial is linear:

$$
q(x) = a_0 + a_1 x
$$

where $a_0 = D$, the shared secret and $D_i \equiv q(i) \pmod {p}$. So we have,

$$
D_1 = 12\equiv a_0 + a_1 \pmod {17}\\
D_4 = 3\equiv a_0 + 4a_1 \pmod {17}
$$

Upon solving this system of equations, we get $D = a_0 = 15$ and $a_1 = 14$.

Here's the last problem from my assignment:

Let $P = (9,7)$ be a point on the elliptic curve $y^2 \equiv x^3 + x + 1 \pmod{23}$. What is the point $2P$ on the elliptic curve?

These two videos ([this one](https://www.youtube.com/watch?v=jfQEOHiwE0k) and [this one](https://www.youtube.com/watch?v=tfFgWr6Hksw)) helped me understand the basic idea behind doubling a point on an elliptic curve.

The derivative of the curve will give us the slope of the tangent at a point:

$$
\frac{dy}{dx} \equiv \frac{3x^2 + 1}{2y} \pmod{23}
$$

At $(9,7)$, the slope of the tangent is $1$.
The equation of the tangent at $(9,7)$ will be:

$$
y = x - 2
$$

Finding the point at which it intersects the elliptic curve, 

$$
(x-2)^2 \equiv x^3 + x + 1 \pmod{23}\\
\implies x^3 - x^2 + 5x - 3 \equiv 0 \pmod{23}
$$

Here's a quick python script I wrote that will help us find the real roots of the above cubic equation:

```python
x = 0
roots = []
for _ in range(3):
    while (x**3 - x**2 + 5*x - 3) % 23 != 0: x+=1
    if x%23 not in roots: roots.append(x%23)
    x+=1
print(roots)
```
> [6, 9]

We already know that the line $y=x-2$ is tangent to the elliptic curve at $(9,7)$. The other point at which it intersects the curve seems to be $(6, 4)$. The point that we are looking for is $2P$ which is the mirror image of this point about the x-axis i.e. $(6, -4)$ or $(6, 19)$.

These final two problems were especially interesting! I still need to read about these concepts in depth, however. 

Anyways, the "solving a mystery" approach is really great. I was able to expose myself to a wide variety of cryptography concepts over the past five days without being bored for a single second thanks to it. I believe this approach is very similar to the [Feynman technique](https://fs.blog/2012/04/feynman-technique/) for learning. I was able to identify gaps in my learning when I wrote them out like this, and then, with the help of the internet, fill those gaps. I believe that this approach can help me learn new programming concepts as well. You can probably expect blog posts to be more frequent than before.

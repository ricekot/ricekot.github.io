---
title: "Solving Cryptography Problems - 4"
description: "Working through El Gamal digital signatures and applying Hadamard gates to a 2-qubit quantum system."
date: "Jun 22 2020"
# tags: notes bits-f463
# contains_math: true
---

Here is today's first problem:

Let the public key be $(y, p, g) = (64, 101, 2)$. The _El Gamal Digital Signature_ of $11$ is $(r, s) = (8, s)$, where $s=$?

- What is the El Gamal Signature Scheme?  
[wikipedia](https://en.wikipedia.org/wiki/ElGamal_signature_scheme): The ElGamal signature scheme is a digital signature scheme which is based on the difficulty of computing discrete logarithms. It was described by Taher Elgamal in 1985.

    my notes:   
    1. Public / Private Keys:  
        A triple $(y, p, g)$, where $p$ is a prime number, $g$ is a generator for $\mathbb{Z}_{p}^{*}$ and  $y \equiv g^x \pmod p$ where x is the private Key.
    1. Signing:  
        The signature of a message $m$ is a pair $(r, s)$. Since this is a probabilistic signature scheme, in order to generate such a pair, the signer begins by choosing a random number $k$ such that $0 \ne k \ne p-1$ and $\gcd (k, p-1) = 1$. Then,  
        
        $$
        r \equiv g^{k} \pmod p \\
        s \equiv (m - xr)\cdot k^{-1} \pmod{(p-1)}
        $$

    1. Verifying:  
        Check that $g^{m} \equiv y^{r} r^{s} \pmod p$

    The equation for s in the Signing step was obtained as follows:

    $$
    g^m \equiv y^r r^s \pmod p \\
    g^m \equiv g^{xr} g^{ks} \pmod p \\
    g^m \equiv g^{xr + ks} \pmod p \\
    m \equiv xr + ks \pmod{(p-1)} \\
    s \equiv (m - xr) k^{-1} \pmod{(p-1)}
    $$

    The second-to-last step might be confusing. Since $g$ is a generator of $\mathbb{Z}_p^*$ and $p$ is a prime number, we have that 

    $$
    g^z \equiv g^{z + (p-1)} \pmod p
    $$

    for any $z \in \mathbb{Z}$. In other words, the powers of $g$ are congruent modulo $p-1$.


For this problem, we need to find $s$. We already have the values of $m$,$r$ and $p$, which means we need the values of $x$ and $k$. Those can be found easily by examining these equations:

$$
64 \equiv 2^{x} \pmod{101} \\
8 \equiv 2^{k} \pmod{101}
$$

It is clear that $x=6$ and $k=3$. We can now find $s$ as, 

$$
s \equiv (11 - 6 \cdot 8) \cdot 3^{-1} \equiv \frac{-37}{3} \equiv \frac{63}{3} \equiv 21 \pmod{100}
$$

Therefore, $s=21$ is the solution to this problem.

Let's move on to the next one:

The _Hadamard_ gate is applied to the two qubits of a 2-qubit system in state

$$
\frac{1}{2} (|00 \rangle + |01 \rangle + |10 \rangle + |11 \rangle).
$$

What is the resulting state of the 2-qubit system?

My notes, [this youtube video](https://www.youtube.com/watch?v=x6gOp_o7Bi8) and [this stackexchange answer](https://quantumcomputing.stackexchange.com/a/2271) allowed me to understand how we can apply a Hadamard gate to two qubits.

First, we can rewrite the given state of the 2-qubit system as:

$$
\left(\frac{|0\rangle+|1\rangle}{\sqrt{2}}\right)\otimes\left(\frac{|0\rangle+|1\rangle}{\sqrt{2}}\right)
$$

Now we will apply the Hadamard operation on each of these qubits,

$$
H \left(\frac{|0\rangle+|1\rangle}{\sqrt{2}}\right) = \left(\frac{1}{\sqrt{2}} \begin{bmatrix}1 & 1\\1 & -1\end{bmatrix}\right) \left(\frac{1}{\sqrt{2}}\begin{bmatrix}1\\1\end{bmatrix}\right) = \begin{bmatrix}1\\0\end{bmatrix}
$$

And finally take the tensor product of the output from the operation,

$$
\begin{bmatrix}1\\0\end{bmatrix} \otimes \begin{bmatrix}1\\0\end{bmatrix} = \begin{bmatrix}1\\0\\0\\0\end{bmatrix}
$$

which is equivalent to $\lvert 00\rangle$, the solution to this problem.

Even though I was able to solve this problem, I do not know anything about quantum computing. It seems like a very cool subject and I'd love to read and learn more about it. Until next time!

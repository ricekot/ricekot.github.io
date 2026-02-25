---
title: "Solving Cryptography Problems - 2"
description: "Solving RSA decryption and digital signature problems step by step, from factoring n to computing modular inverses."
date: "Jun 20 2020"
# tags: notes bits-f463
# contains_math: true
---

Following up from my [previous post](/2020/cryptography-assignment-1), here's the next problem:

The public key is $(n, e) = (221, 11)$. What is the _RSA Decryption_ of $7$?

- What is _RSA_?
[wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)): RSA (Rivest–Shamir–Adleman) is one of the first public-key cryptosystems and is widely used for secure data transmission. In such a cryptosystem, the encryption key is public and distinct from the decryption key which is kept secret (private). In RSA, this asymmetry is based on the practical difficulty of factoring the product of two large prime numbers, the "factoring problem". 

- How does RSA work?  
Let's look at an example from [wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Example):  

1. Choose two distinct prime numbers, such as  
$p = 61$ and $q = 53$
1. Compute $n = pq$ giving  
$n = 61 \times 53 = 3233$
1. Compute the Carmichael's totient function of the product as  
$\lambda (n)=\operatorname {lcm} (p-1,q-1)$ giving  
$\lambda (3233)=\operatorname {lcm} (60,52)=780$
1. Choose any number $1 \lt e \lt 780$ that is coprime to $780$. Choosing a prime number for $e$ leaves us only to check that $e$ is not a divisor of $780$. Let $e = 17$.
1. Compute $d$, the modular multiplicative inverse of $e \bmod \lambda(n)$ yielding, $d = 413$  
    Worked example for the modular multiplicative inverse:  
    $d\times e \equiv 1{\bmod {\lambda }}(n)$  
    $413\times 17 \equiv 1{\bmod {7}}80$

The public key is $(n = 3233, e = 17)$. For a padded plaintext message m, the encryption function is $c(m)=m^{17} \bmod 3233$

The private key is $(n = 3233, d = 413)$. For an encrypted ciphertext c, the decryption function is $m(c)=c^{413} \bmod 3233$

For this problem we have $n$, $e$, and $c$. We have to find $d$ and calculate $m$ using the above decryption function.  
$n = 221 = 13 \times 17$. Carmichael's totient function, $\lambda (221)=\operatorname {lcm} (12,16)=48$. We already have $e = 11$.  
$d$ is the modular multiplicative inverse of $e \bmod \lambda(n)$ i.e.,  
$d \times e \equiv 1 \bmod \lambda (n)$ or $d \times 11 \equiv 1 \bmod 48$.  

We can write a simple program to calculate d:

```python
d = 0
while (11 * d) % 48 != 1: d+=1
print(d)
```

> 35

Now we can find $m$ as: $m = c ^ d \bmod n = 7 ^{35} \bmod 221 = 54$

Thus, 54 is our final answer.

Further reading:
- What is Carmichael's totient function?  
[wikipedia](https://en.wikipedia.org/wiki/Carmichael_function): The Carmichael function associates to every positive integer $n$ a positive integer $\lambda (n)$, defined as the smallest positive integer $m$ such that  
$$ a^m \equiv 1 \bmod n $$  
for every integer $a$ between $1$ and $n$ that is coprime to $n$. 

[wikipedia](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n#General_composite_numbers): The exponent of the multiplicative group of integers mod n ([previous post](/2020/cryptography-assignment-1)), that is, the least common multiple of the orders in the cyclic groups, is given by the Carmichael function $\lambda (n)$. In other words, $\lambda (n)$ is the smallest number such that for each $a$ coprime to $n$, $a^{\lambda(n)} \equiv 1 \pmod n$ holds.

- How can we find the modular multiplicative inverse using pen and paper?
By making use of the Extended Euclidean Algorithm. Here's a [youtube video](https://www.youtube.com/watch?v=fz1vxq5ts5I) that walks you through the procedure and here's a [Khan Academy article](https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm) that explains it well. Adding these here for myself for future reference.

Now let's try another one:

The public key is $(n, e) = (437, 13)$. What is the _RSA Digital Signature_ of $17$?

- What is _RSA Digital Signature_?  
[This article](https://www.cs.cornell.edu/courses/cs5430/2015sp/notes/rsa_sign_vs_dec.php) explained it very well. From the article, here is the "textbook" definition of RSA signing compared with the Encryption and Decryption functions.

    - $Enc(m; e) = R(m,e)$  
    - $Dec(c; d) = R(c,d)$  
    - $Sign(m; d) = R(m,d)$  
    - $Ver(m; s; e) = R(s,e) == m$  

We are basically applying the sender's private key on the message they are sending to generate a signature. That means, for this problem, we have to find $m^d \bmod n$.

We can follow the procedure from the previous problem now. $d$, or the private key, is the modular multiplicative inverse of $e \bmod \lambda (n)$. Here, $\lambda (n)$ is the Carmichael totient function, calculated as $\lambda (n) = lcm (p-1, q-1)$, where $p$ and $q$ are the prime factors of $N$. 

Through trial and error, we find that the prime factors of $n = 437$ are $19$ and $23$. Of course this would be a very [difficult problem](https://en.wikipedia.org/wiki/Integer_factorization) if the prime numbers were sufficiently large; that's the whole idea behind RSA encryption. Anyways, now that we have $p$ and $q$, we can find $\lambda (437) = lcm (18, 22) = 198$. Now, using the same algorithm I used for the previous problem,

```python
d = 0;
while (d * 13) % 198 != 1: d+=1
print(d)
```
> 61

Therefore, the solution to this problem is $17^{61}\bmod 437 = 195$.

Until next time!

---
title: "Solving Cryptography Problems - 3"
description: "Tackling Rabin decryption and digital signatures using the Chinese Remainder Theorem and extended Euclidean algorithm."
date: "Jun 21 2020"
# tags: notes bits-f463
# contains_math: true
---

Here's the next problem:

The public key is $N=209$. What is the _Rabin decryption_ of $80$?

- What is _Rabin decryption_?  
[wikipedia](https://en.wikipedia.org/wiki/Rabin_cryptosystem): The Rabin cryptosystem is an asymmetric cryptographic technique, whose security, like that of RSA, is related to the difficulty of integer factorization. However the Rabin cryptosystem has the advantage that it has been mathematically proven to be computationally secure against a chosen-plaintext attack as long as the attacker cannot efficiently factor integers, while there is no such proof known for RSA.

- What is a chosen plaintext attack?  
[wikipedia](https://en.wikipedia.org/wiki/Chosen-plaintext_attack): A chosen-plaintext attack (CPA) is an attack model for cryptanalysis which presumes that the attacker can obtain the ciphertexts for arbitrary plaintexts. The goal of the attack is to gain information that reduces the security of the encryption scheme. 

- How does the Rabin Encryption scheme work?  
[wikipedia](https://en.wikipedia.org/wiki/Rabin_cryptosystem#Encryption_Algorithm): The keys for the Rabin cryptosystem are generated as follows:  
    1. Choose two large distinct prime numbers $p$ and $q$ such that $p\equiv 3\bmod 4$ and $q\equiv 3\bmod 4$.
    1. Compute $n=pq$.
    Then $n$ is the public key and the pair $(p,q)$ is the private key. 
    
- Decryption  
Since 209 is not a large number, we can easily factorise it through trial and error:

```python
i = 2
while 209 % i != 0: i+=1
print(i, 209/i)
```
> 11 19.0

Let $p=11$ and $q=19$. Now, following the procedure from wikipedia,  

The message $m$ can be recovered from the ciphertext $80$ by taking its square root modulo $209$ as follows.

1. Compute the square root of $c$ modulo $p$ and $q$:  

    $$
    m_p = 80^{\frac{1}{4}(11+1)} \bmod{11} = 5 \\
    m_q = 80^{\frac{1}{4}(19+1)} \bmod{19} = 17
    $$

1. Using the extended Euclidean algorithm to find $y_p$ and $y_q$ such that 

    $$
    y_p \cdot p + y_q \cdot q = 1
    $$

    ```python 
    def ExtEuclid (a,b):
    # returns a triple (d,s,t) such that d = gcd(a,b) and
    # d == a*s + b*t
    if b == 0: return (a,1,0)
    (d1, s1, t1) = ExtEuclid(b,a%b)
    d = d1
    s = t1
    t = s1 - int(a / b) * t1
    return (d,s,t)

    print('{} = 19*({}) + 11*({})'.format(*ExtEuclid(19,11)))
    ```
    > 1 = 19*(-4) + 11*(7)

    So we have $y_p = 7$ and $y_q = -4$.  
    These two articles ([this one](https://brilliant.org/wiki/extended-euclidean-algorithm/) and [this one](https://www.csee.umbc.edu/~chang/cs203.s09/exteuclid.shtml)) were useful in understanding the algorithm.

1. Using the Chinese remainder theorem to find the four square roots of $c$ modulo $n$:
    $$
    r_1 = (7 \cdot 11 \cdot 17 + (-4) \cdot 19 \cdot 5) \bmod 209 = 93\\
    r_2 = 209 - 93 = 116\\
    r_3 = (7 \cdot 11 \cdot 17 - (-4) \cdot 19 \cdot 5) \bmod 209 = 17\\
    r_4 = 209 - 17 = 192 
    $$

    One of these four values is the original plaintext $m$, although which of the four is the correct one cannot be determined without additional information.  
    Of these four, $93$ is the only value that matches an option in my assignment, which means that it is the original plaintext in this case.

Further Reading / Questions:
- [What is the Chinese Remainder Theorem?](https://en.wikipedia.org/wiki/Chinese_remainder_theorem)
- [How does the formula we used compute square roots?](https://en.wikipedia.org/wiki/Rabin_cryptosystem#Computing_square_roots)
- [Rabin Cryptosystem in depth](https://www.math.auckland.ac.nz/~sgal018/crypto-book/ch24.pdf)
- What "additional information" is required after decryption to determine the correct plaintext message?

Here's the next one:

The public key is $N = 713$. What is the _Rabin Digital Signature_ of $473$?

- What is the Rabin Signature Scheme?  
From my class notes,  
Signature: $s = m^{1/2} \bmod n$ where $s$ is the signature  
Verification: $m = s^2 \bmod n$

Now I can think of two ways to solve this:

- the one where we use pen and paper

    $x^2 \equiv 473 \bmod 713$  
    $\implies x^2 \equiv 473 \bmod 23$ and $x^2 \equiv 473 \bmod 31$  
    $\implies x^2 \equiv 13 \bmod 23$ and $x^2 \equiv 8 \bmod 31$  
    $\implies x^2 \equiv 36 \bmod 23$ and $x^2 \equiv 225 \bmod 31$  
    $\implies x \equiv \pm 6 \bmod 23$ and $x \equiv \pm 15 \bmod 31$

    We can then solve the four sets of equations using the Chinese Remainder theorem.
    These two videos ([this one](https://www.youtube.com/watch?v=azGV8megnXY) and [this one](https://www.youtube.com/watch?v=zIFehsBHB8o)) helped me in this approach.

- the one where we use a brute force approach

    ```python
    i = j = 1
    while j <= 4:
        while i**2 % 713 != 473: i+=1
        print(i)
        i+=1
        j+=1
    ```

Either way, the four roots we get are: $109$, $201$, $512$ and $604$.

Of these four, $201$ is the only one present in the given options in my assignment, so that is the solution to this problem.

Further Reading / Questions:
- [What is the Rabin Signature Scheme?](http://x5.net/faqs/crypto/q37.html)
- How do we decide which signature to use (out of so many possible values)?

I clearly need to read more about Rabin's cryptosystem, because the knowledge I have currently is not complete. I don't want to make any commitments, except that if I encounter it again I'll try to gain an in depth understanding of the cryptosystem and the problem solving techniques it involves (such as the Chinese remainder theorem). 

Until next time!

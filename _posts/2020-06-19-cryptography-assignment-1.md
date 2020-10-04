---
layout: post
title: Solving Cryptography Problems - 1
tags: notes bits-f463
contains_math: true
---

Following the "solving a mystery" approach from my [last post]({% post_url 2020-06-14-math-is-fiction %}), I will be attempting to solve a couple of problems from my Cryptography Assignment.

Here's the first one:

Let $\small G : \\{0,1\\}^4 \to \\{0,1\\}^4 $ be a 4-bit block cipher defined by $ G(x_1 x_2 x_3 x_4) = x_4 x_2 x_3 x_1 $. What is the CBC-MAC of $ 10100101 $?


It looks like $G$ is a function that takes a 4-bit binary number (a "nibble") as input and gives another nibble as output. From the definition, it seems that if I give $0001$ as input, I will get $G(0001) = 1000$ as output.

- What is a block cipher?  
[wikipedia](https://en.wikipedia.org/wiki/Block_cipher): In cryptography, a block cipher is a deterministic algorithm operating on fixed-length groups of bits, called blocks, with an unvarying transformation that is specified by a symmetric key.

- what is a deterministic algorithm?  
[wikipedia](https://en.wikipedia.org/wiki/Deterministic_algorithm): A deterministic algorithm computes a mathematical function. In other words, given a particular input, the algorithm will always produce the same output, with the underlying machine always passing through the same sequence of states.

So in this case, $G$ is the deterministic algorithm. Now, given $G$, we have to find the CBC-MAC of $ 10100101 $.

- What is a CBC-MAC?  
[wikipedia](https://en.wikipedia.org/wiki/CBC-MAC): A cipher block chaining message authentication code (CBC-MAC) is a technique for constructing a message authentication code from a block cipher. The message is encrypted with some block cipher algorithm in CBC mode to create a chain of blocks such that each block depends on the proper encryption of the previous block.

- What is a message authentication code?  
[wikipedia](https://en.wikipedia.org/wiki/Message_authentication_code): A message authentication code (MAC), sometimes known as a tag, is a short piece of information used to authenticate a message—in other words, to confirm that the message came from the stated sender (its authenticity) and has not been changed.

    Informally, a message authentication code system consists of three algorithms:
    - A key generation algorithm selects a key from the key space uniformly at random.
    - A signing algorithm efficiently returns a tag given the key and the message.
    - A verifying algorithm efficiently verifies the authenticity of the message given the key and the tag. That is, return accepted when the message and tag are not tampered with or forged, and otherwise return rejected.  

- What is the CBC mode for a block cipher algorithm?  
[wikipedia](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_block_chaining_(CBC)): In CBC mode, each block of plaintext is XORed with the previous ciphertext block before being encrypted. This way, each ciphertext block depends on all plaintext blocks processed up to that point. To make each message unique, an initialisation vector must be used in the first block. 

We have to find the CBC-MAC of $ 10100101 $. Upon breaking it into blocks of 4-bits, we get $ 1010 $ and $ 0101 $. 

- What should the initialisation vector be when calculating CBC-MAC?  
[wikipedia](https://en.wikipedia.org/wiki/CBC-MAC): To calculate the CBC-MAC of message m, one encrypts m in CBC mode with zero initialization vector and keeps the last block.

$ G(0000 \oplus 1010) = G(1010) = 0011 $  
$ G(0011 \oplus 0101) = G(0110) = 0110 $

The last block is the CBC-MAC. Thus, $ 0110 $ is the solution of this problem.

That was fun. Let's try another one:


Alice and Bob are following the _Diffie–Hellman Secret Key Exchange Protocol_  with $p = 101$ (the prime number $p$), $g=2$ (the generator of $\mathbb{Z}^*_p$), $x=11$ (the private key of Alice), $y=13$ (the private key of Bob). What is the shared secret key between Alice and Bob?

- What is the _Diffie–Hellman Secret Key Exchange Protocol_ ?  
I already have an idea about this protocol from [this Coursera course](https://www.coursera.org/learn/it-security). Here is an example from [Wikipedia](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange#Cryptographic_explanation):

The simplest and the original implementation of the protocol uses the multiplicative group of integers modulo p, where p is prime, and g is a primitive root modulo p. These two values are chosen in this way to ensure that the resulting shared secret can take on any value from 1 to p–1. Here is an example of the protocol

1. Alice and Bob publicly agree to use a modulus $p = 23$ and base $g = 5$ (which is a primitive root modulo 23).
1. Alice chooses a secret integer $a = 4$, then sends Bob $A = g^a \bmod p$
    - $A = 5^4 \bmod 23 = 4$
1. Bob chooses a secret integer $b = 3$, then sends Alice $B = g^b \bmod p$
    - $B = 5^3 \bmod 23 = 10$
1. Alice computes $s = B^a \bmod p$
    - $s = 10^4 \bmod 23 = 18$
1. Bob computes $s = A^b \bmod p$
    - $s = 4^3 \bmod 23 = 18$
1. Alice and Bob now share a secret (the number 18).

Let's apply the above procedure to this problem.
1. Alice and Bob publicly agree to use a modulus $p = 101$ and base $g = 2$ (which is a primitive root modulo 101).
1. Alice chooses a secret integer $a = 11$, then sends Bob $A = g^a \bmod p$
    - $A = 2^{11}\bmod101 = 28$
1. Bob chooses a secret integer $b = 13$, then sends Alice $B = g^b \bmod p$
    - $B = 2^{13}\bmod101 = 11$
1. Alice computes $s = B^a\bmod p$
    - $s = 11^{11}\bmod101 = 86$
1. Bob computes $s = A^b\bmod p$
    - $s = 28^{13}\bmod101 = 86$
1. Alice and Bob now share a secret (the number 86).

Hence, the solution of this problem is 86. Here's some additional information:

- What is a primitive root modulo?  
[wikipedia](https://en.wikipedia.org/wiki/Primitive_root_modulo_n): $g$ is a primitive root modulo $n$ if for every integer $a$ coprime to $n$, there is an integer $k$ such that $g^k \equiv a \bmod n$. Note that $g$ is a primitive root modulo $n$ if and only if $g$ is a generator of the multiplicative group of integers modulo $n$. 

- What is the multiplicative group of integers modulo $n$?  
[wikipedia](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n): The integers coprime (relatively prime) to $n$ from the set $\\{0,1,\dots ,n-1\\}$ of _n_ non-negative integers form a group under multiplication modulo $n$, called the multiplicative group of integers modulo $n$.

- What is a group (algebra)?  
[wikipedia](https://en.wikipedia.org/wiki/Group_(mathematics)): A group is a set equipped with a binary operation that combines any two elements to form a third element in such a way that four conditions called group axioms are satisfied, namely closure, associativity, identity and invertibility. 

So, an example of a multiplicative group of integers modulo n might be $$(\mathbb{Z}_5^*, *)$$ where $\mathbb{Z}_5^* = \\{x : gcd(x, 5) = 1\\}$ i.e. $\mathbb{Z}_5^* = \\{1, 2, 3, 4\\}$ and $a * b = ab \bmod 5$. We can verify that the four group axioms are satisfied. I'll go into more detail if a future problem requires me to do so. For now, I'll end here.


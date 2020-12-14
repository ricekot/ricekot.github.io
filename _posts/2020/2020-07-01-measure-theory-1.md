---
layout: post
title: Adventures in Measure Theory - 1
tags: notes math-f244
contains_math: true
---

Today, I will start studying measure theory. I will be reading through the [Measure Theory series by D.H. Fremlin](https://www1.essex.ac.uk/maths/people/fremlin/mt.htm) and blogging my notes here.

Let's jump straight into it!

> "The business of pure mathematics is to express and extend the logical capacity of the human mind, and ... the actual theorems we work through are merely vehicles for the ideas."
> ~ D.H. Fremlin

#### Measure Space  
A set in which some (not, as a rule, all) subsets may be assigned a measure.

- What is a measure?  
Although measure is just a number that is assigned to a set, it can be interpreted as anything that determines the size, amount or degree of something. Area, mass, volume, temperature are just some examples. In general, a measure may be interpreted as anything additive, i.e., the measure of the union of two disjoint sets must be equal to the sum of their individual measures.

When studying any measure, a proper understanding of the class of sets which it measures is necessary. This is where $\sigma$-algebras come in. All measures in the _standard theory_ (there are non-standard theories too?!) are defined on such collections.

#### $\sigma$-algebra of sets 
[111A] _Definition._ Let $X$ be a set. A $\sigma$-algebra of subsets of $X$ (a.k.a $\sigma$-field) is a family $\Sigma$ of subsets of $X$ such that  
(i) $\emptyset\in\Sigma$;  
(ii) for every $E\in\Sigma$, its complement $X\setminus E$ in $X$ belongs to $\Sigma$;  
(iii) for every sequence $\langle E_n\rangle_{n\in\Bbb N}$ in $\Sigma$, its union $\bigcup_{n\in\Bbb N}E_n$ belongs to $\Sigma$.

It is also obvious that for any $X$,
- $\Sigma=\\{\emptyset,X\\}$ is the smallest $\sigma$-algebra of subsets of $X$; and,
- $\mathcal{P}X$, the power set of $X$, is the largest $\sigma$-algebra of subsets of $X$.

#### Elementary properties of $\sigma$-algebras  
[111D]  If $\Sigma$ is a $\sigma$-algebra of subsets of $X$, then it has the following properties.
- (a) $E\cup F\in\Sigma$ for all $E$, $F\in\Sigma$.  
_Proof._ if $E$, $F\in\Sigma$, set $E_0=E$, $E_n=F$ for $n\ge 1$; then $\langle E_n\rangle_{n\in\Bbb N}$ is a sequence in $\Sigma$ and $E\cup F=\bigcup_{n\in\Bbb N}E_n\in\Sigma$.

- (b) $E\cap F\in\Sigma$ for all $E$, $F\in\Sigma$.  
_Proof._ By 111A (ii), $X\setminus E$ and $X\setminus F\in\Sigma$;  
by (a), $(X\setminus E)\cup(X\setminus F)\in\Sigma$;  
by (ii) again, $X\setminus((X\setminus E)\cup(X\setminus F))\in\Sigma$;  but this is just $E\cap F$.

- (c) $E\setminus F\in\Sigma$ for all $E$, $F\in\Sigma$.  
_Proof._ By 111A (ii), $X\setminus F\in\Sigma$;  
by (b), $E\cap(X\setminus F)\in\Sigma$; but this is just $E\setminus F$.

- (d) Now suppose that $\langle E_n\rangle_{n\in\Bbb N}$ is a sequence in $\Sigma$, then, following the same logic as (b), we have

$$ \bigcap_{n\in\Bbb N}E_n = X\setminus\bigcup_{n\in\Bbb N}(X\setminus E_n) \in \Sigma $$

#### Countable Sets
A set $K$ is countable if there exists an injective function $f: K \to\Bbb N$.  
Equivalent definition: A set $K$ is countable if either it is empty or there is a surjection from $\Bbb N$ onto $K$.  

If $\Sigma$ is a $\sigma$-algebra of sets and $\langle  E_k\rangle_{k\in K}$ is a family in $\Sigma$ indexed by $K$, then $\bigcup_{k\in K}E_k\in\Sigma$.  

_Proof._ For if $n\mapsto k_n:\Bbb N\to K$ is a surjection, then $E'\_n=E\_{k\_n}\in\Sigma\,\,\forall\,\, n\in\Bbb N$, and $\bigcup\_{k\in K}E\_k=\bigcup\_{n\in\Bbb N}E'\_n\in\Sigma$. This leaves out the case $K=\emptyset$; but in this case the natural interpretation of $\bigcup\_{k\in K}E_k$ is

$$\{x:\exists\,\, k\in \emptyset,\,x\in E_k\}$$

which is itself $\emptyset$, and therefore belongs to $\Sigma$ by clause (i) of 111A.

#### Some properties of countable sets

- (i) If $K$ is countable and $L \subseteq K$ then $L$ is countable.  
_Proof._ $K$ is countable, which means there exists an injective function $f:K \to \Bbb N$. Since $L \subseteq K$, $f$ is valid for all values in $L$.

- (ii) The Cartesian Product $\Bbb N \times \Bbb N$ is countable.  
_Proof._ Consider the function $f(x, y) = 2^x 3^y$. This function is injective for all $(x, y) \in \Bbb N \times \Bbb N$ $[\because f(x_1, y_1) = f(x_2, y_2) \implies (x_1, y_1) = (x_2, y_2)]$.

- (iii) If $K$ and $L$ are countable sets, then so is $K\times L$.  
_Proof._ $K$ and $L$ are countable sets, which means there exist injective functions $f:K\to\Bbb N$ and $g:L\to\Bbb N$. Consider a function $h:K\times L \to\Bbb N$ such that $h(k,l)=2^{f(k)} 3^{g(l)}$. Then $h$ is injective and hence $K\times L$ is a countable set. 

- (iv) If $K_1,K_2,\dots ,K_r$ are countable sets, so is $K_1\times K_2\times\dots K_r$.  
_Proof._ We will use induction on $r$ to prove this result.  
For $r=1$, the statement is trivial.  
Assume that the statement holds for $r=m$. If we are able to show that it also holds for $r=m+1$, then by the principle of mathematical induction, it will hold for all $r\in\Bbb N$.  
We have,  $K_1\times K_2\times\dots K_m$ is a countable set. Let it be equal to $M$. There exists an injective function $f:M\to\Bbb N$.  
When $r=m+1$, it is given that $K\_{m+1}$ is a countable set, i.e., there exists an injective function $g:K\_{m+1} \to\Bbb N$. Now, consider a function $h:M\times K\_{m+1}\to \Bbb N$ defined as $h(x, y) = 2^{f(x)} 3^{g(y)}$. It can be easily verified that this function is injective. Thus, $K\_1\times K\_2\times\dots K\_{m+1}$ is a countable set. 

Combining the idea of countable sets with 111D (d), we can say that,  
- If $\Sigma$ is a $\sigma$-algebra of sets, $K$ is a non-empty countable set, and $\langle E\_k\rangle\_{k\in K}$ is a family in $\Sigma$, then $\bigcap\_{k\in K}E\_k$ belongs to $\Sigma$.  
_Proof._ Since $K$ is a countable set, there exists a surjective function $f:\Bbb N\to K$. This means that, $\forall\,\,k\in K\,\,\exists\,\, n_k\in\Bbb N$. Thus, $\bigcap_{k\in K}E_k = \bigcap_{n\in\Bbb N}E_{n_k} \in \Sigma$. 

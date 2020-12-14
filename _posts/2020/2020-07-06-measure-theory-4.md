---
layout: post
title: Adventures in Measure Theory - 4
tags: notes math-f244
contains_math: true
---

I am following the [Measure Theory series by D.H. Fremlin](https://www1.essex.ac.uk/maths/people/fremlin/mt.htm) and blogging my notes here.

Continuing from where I left off [last time]({% post_url 2020/2020-07-04-measure-theory-3 %}),

#### 111X (c)
Let $X$ and $Y$ be sets and $\Sigma$ a $\sigma$-algebra of subsets of $X$. Let $\phi:X\to Y$ be a function. Show that
$\\{F:F\subseteq Y,\,\phi^{-1}[F]\in\Sigma\\}$ where $\phi^{-1}[F] = \\{x: x\in X, \phi (x)\in F\\}$ is a $\sigma$-algebra of subsets of $Y$.

Let's try to understand the problem first. Consider a collection $\Sigma_Y$ of subsets of $Y$ such that if we construct a set $S'$ for every set $S$ in $\Sigma_Y$ with the preimages of elements of $S$ under $\phi$ then $S'$ will lie in $\Sigma$. We have to show that $\Sigma_Y$ is a $\sigma$-algebra of subsets of $Y$.

_Proof._  
Let $\Sigma_Y = \\{F:F\subseteq Y,\,\phi^{-1}[F]\in\Sigma\\}$. 

(i) We know that $\emptyset\subseteq Y$ and $\phi^{-1}[\emptyset] = \emptyset\in\Sigma$. Thus, $\emptyset\in\Sigma_Y$.  

(ii) Let $F\in\Sigma_Y$. Then $\phi^{-1}[F]\in\Sigma$ and since $\Sigma$ is a $\sigma$-algebra of subsets of $X$,  

$${
X\setminus\phi^{-1}[F]\in\Sigma \\
\implies\phi^{-1}[Y]\setminus\phi^{-1}[F]\in\Sigma \\
\implies\phi^{-1}[Y\setminus F]\in\Sigma
}$$

Also it is obvious that $Y\setminus F\subseteq Y$. Therefore, since $F$ was chosen arbitrarily, we have $Y\setminus F\in\Sigma_Y\,\,\forall\,\,F\in\Sigma_Y$.  

(iii) Let $\langle E_n \rangle_{n\in\Bbb N}$ be a sequence in $\Sigma_Y$. Then there exists a sequence $\langle\phi^{-1}[E_n]\rangle_{n\in\Bbb N}$ in $\Sigma$ corresponding to this one. Since $\Sigma$ is a $\sigma$-algebra of subsets of $X$,

$${
\bigcup_{n\in\Bbb N}\phi^{-1}[E_n]\in\Sigma \\
\implies\phi^{-1}[\bigcup_{n\in\Bbb N}E_n]\in\Sigma
}$$

Also since $\langle E_n \rangle_{n\in\Bbb N}\subseteq\mathcal PY$ we must have $\bigcup_{n\in\Bbb N} E_n \subseteq Y$. Therefore, for all sequences $\langle E_n \rangle_{n\in\Bbb N}$ in $\Sigma_Y$ we have $\bigcup_{n\in\Bbb N} E_n \in\Sigma_Y$.

From (i), (ii), and (iii) it is clear that $\Sigma_Y$ is a $\sigma$-algebra of subsets of $Y$. $$\tag*{$\square$}$$

#### 111X (d)

Let $X$ and $Y$ be sets and $T$ a $\sigma$-algebra of subsets of $Y$. Let $\phi:X\to Y$ be a function. Show that $\\{\phi^{-1}[F]:F\in T\\}$ is a $\sigma$-algebra of subsets of $X$.

This seems like the previous problem, but in reverse. We have to show that the family of sets of preimages of elements in sets in $T$ is a $\sigma$-algebra of subsets of $X$. 

_Proof._

Let $\Sigma = \\{\phi^{-1}[F]:F\in T\\}$.

(i) $\phi^{-1}[F]$ is defined as $\\{x: x\in X, \phi(x)\in F\\}$. Thus, $\phi^{-1}[F]\subseteq X\,\,\forall\,\,F\subseteq Y$.

(ii) Since $T$ is a $\sigma$-algebra, $\emptyset\in T$. Also, $\phi^{-1}[\emptyset] = \emptyset$. Therefore $\emptyset\in\Sigma$.

(iii) We know that for every $F\in T$ we have $Y\setminus F\in T$. This means that for every $\\phi^{-1}[S]\in\Sigma$ we also have    

$${
\phi^{-1}[Y\setminus F]\in\Sigma \\
\implies\phi^{-1}[Y]\setminus\phi^{-1}[F]\in\Sigma \\
\implies X\setminus\phi^{-1}[F]\in\Sigma
}$$

(iv) Let $\langle E_n \rangle_{n\in\Bbb N}$ be a sequence in $T$. Then $\bigcup_{n\in\Bbb N}E_n\in T$. Thus, for every sequence $\langle \phi^{-1}[E_n] \rangle_{n\in\Bbb N}\in\Sigma$ we also have 

$${
\bigcup_{n\in\Bbb N}\phi^{-1}[E_n]\in\Sigma  \\
\implies\phi^{-1}[\bigcup_{n\in\Bbb N}E_n]\in\Sigma
}$$

Therefore, from (i), (ii) and (iii) we can conclude that $\Sigma$ is a $\sigma$-algebra of subsets of $X$. $$\tag*{$\square$}$$

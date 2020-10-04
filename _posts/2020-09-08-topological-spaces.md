---
layout: post
title: 🍩 Topological Spaces
tags: notes math-f311
contains_math: true
---

## Basic Definitions

- What is a topology?

    A topology on a set X is a collection $\tau$ of subsets of X such that

    1. $\phi$ and X are in $\tau$.
    2. The union of the elements of any sub-collection of $\tau$ is in $\tau$.
    3. The intersection of the elements of any finite sub-collection of $\tau$ is in $\tau$.
  
- What is a topological space?

    A topological space is an ordered pair (X, $\tau$) consisting of a set X and a topology $\tau$ on X.

- What is an open set?

    If X is a topological space with topology $\tau$, we say that a subset U of X is an open set of X if U belongs to the collection $\tau$, i.e., 

    $$U\subseteq X\text{ is open if }U\in\tau$$

- What is a discrete topology?

    If X is any set, the collection of *all* subsets of X (i.e. $\mathcal P(x)$) is a topology on X, it is called the discrete topology on X.

- What is an indiscrete topology?

    The collection consisting of X and $\phi$ only is a topology on X; it is called the indiscrete topology, or the trivial topology on X.

- What are comparable topologies?

    Suppose that $\tau$ and $\tau'$ are two topologies on a given set X. If $\tau\subseteq\tau'$ we say that $\tau'$ is **finer** than $\tau$ or $\tau$ is **coarser** than $\tau'$. If $\tau\subset\tau'$ we say that $\tau'$ is **strictly finer** than $\tau$ or $\tau$ is **strictly coarser** than $\tau'$. We say that $\tau$ is **comparable** to $\tau'$ if either is contained in the other.

    Munkres writes that, "This terminology is suggested by thinking of a topological space as being something like a truckload full of gravel—the pebbles and all unions of collections of pebbles being the open sets. If now we smash the pebbles into smaller ones, the collection of open sets has been enlarged, and the topology, like the gravel, is said to have been made finer by the operation."

## A Couple of Examples of Topologies

- Finite Complement Topology (a.k.a. co-finite topology)

    Let $X$ be a set, let $\tau_f$ be the collection of all subsets $U$ of $X$ such that $X\setminus U$ either is finite or is all of $X$. Then $\tau_f$ is a topology on $X$, called the finite complement topology.

    - Proof
        1. $X\setminus X=\phi$ is finite. $X\setminus\phi=X$ is all of $X$. Thus, both $X\text{ and }\phi\in\tau_f$.
        2. Consider an indexed sub-collection $\{T_\alpha\}$ of $\tau_f$. Then for any $T_\alpha,\,X\setminus T_\alpha$ is finite. Hence, 

            $$X\setminus\bigcup_\alpha T_\alpha = \bigcap_\alpha X\setminus T_\alpha$$

            which is an intersection of finite sets and is thus finite. Therefore, $\bigcup_\alpha T_\alpha\in\tau_f$

        3. Consider a finite indexed sub-collection $\{T_\alpha\}$ of $\tau_f$. Then,

            $$X\setminus\bigcap_\alpha T_\alpha = \bigcup_\alpha X\setminus T_\alpha$$

            which is a finite union of finite sets and is hence finite. Therefore, $\bigcap_\alpha T_\alpha \in\tau_f$.

- Countable Complement Topology

    Let $X$ be a set, let $\tau_c$ be the collection of all subsets $U$ of $X$ such that $X\setminus U$ either is countable or is all of $X$. Then $\tau_c$ is a topology on $X$.

    - Proof
        1. $X\setminus\phi = X$ is all of $X$. $X\setminus X=\phi$ is countable with zero elements. Thus, both $\phi\text{ and }X\in\tau_c$.
        2. Let $\{T_\alpha\}$ be an indexed sub-collection of $\tau_c$. Then, we can write,

            $$X\setminus\bigcup_\alpha T_\alpha = \bigcap_\alpha X\setminus T_\alpha$$

            which is an intersection of countable sets ( $\forall\alpha, \,\,X\setminus T_\alpha\text{ is countable}$ ) and is hence countable.

        3. Let $\{T_\alpha\}$ be a finite indexed sub-collection of $\tau_c$. Then, we can write,

            $$X\setminus\bigcap_\alpha T_\alpha = \bigcup_\alpha X\setminus T_\alpha$$

            which is a finite union of countable sets and is hence countable.

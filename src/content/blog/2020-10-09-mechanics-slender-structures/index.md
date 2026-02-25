---
title: "The Mechanics of Slender Structures"
description: "Study notes on forces in slender structures: shear force and bending moment diagrams, distributed loading, and singularity functions."
date: "Oct 09 2020"
# contains_math: true
# tags: notes me-f211
---

My notes from Chapter 3 of "An Introduction to the Mechanics of Solids" by Crandall and Dahl.

- Summary of Chapter 2, "Introduction to Mechanics of Deformable Bodies" (according to 3.1)

    Analysis of Deformable Bodies

    1. Study of forces and equilibrium requirements
    2. Study of deformation and conditions of geometric fit
    3. Application of force-deformation relations

- What is Chapter 3, "Forces and Moments Transmitted by Slender Members" all about?

    We are going to be concerned with the study of forces and the equilibrium requirements, as applied to slender members.

- What are Slender Members?

    Those members of engineering structures whose lengths are much longer as compared to either of their cross-sectional dimensions are called slender members. In case of loops, the diameter must be much larger than the thickness of the long rod that is looped.

- What is the subscript notation we are using to denote forces and moments at a section in slender members?

    We usually have two letters in the subscript. 

    For a force $F_{ab}$, $a$ denotes the direction of the vector perpendicular to the area of cross-section in consideration and, $b$ denotes the direction of the Force.

    Thus, $F_{xx}$ is an axial force while $F_{xy}$ and $F_{xz}$ are shear forces.

    Similarly, for a moment $M_{ab}$, $a$ has the same meaning as above and $b$ is the direction of the force that is responsible for this moment.

    Hence, $M_{xx}$ is a twisting moment while $M_{xy}$ and $M_{xz}$ are bending moments.

- What about the sign convention?

    A positive force or moment on a positive face is positive. So is a negative force or moment on a negative face (implied by Newton's third law). Here, positive and negative mean in a positive or negative coordinate direction respectively.

- What problem solving approach do we usually follow, when we have multiple loads on a slender member?

    The Method of Sections

    1. First, draw a free body diagram of the entire slender member and mark all the forces acting on it.
    2. Then, use the equations of equilibrium $\Sigma F = 0$ and $\Sigma M = 0$ to get relations between them.
    3. Finally, cut the member at a section of your choice and repeat step 2 on either of the resulting segments.

- What is a *shear force diagram*?

    A graph of shear force on a body versus the distance along a beam (from a given point) where it acts.

- What is a *bending moment diagram*?

    A graph of bending moment on a body versus the distance along a beam (from a given point) where it acts.

- Why do we need these diagrams?

    If we wanted to design a durable engineering structure, we would need to know the maximum forces that can act on the members of the structure. Further, knowing the force distribution may allow us to better arrange all the different members in the structure together. I've not personally designed any such structures but in my opinion, a well engineered structure is one which is easy to put together and take apart, kind of like Legos.

- What is the Point of Contraflexure?

    It is the point on a bending moment diagram where the bending moment changes its sign (i.e. positive to negative or vice versa). At this point the value of the bending moment is zero.

- What is *Intensity of Loading?*

    Intensity of loading, $q$ is defined as the limit,

    $$q = \lim_{\Delta x\to0}\frac{\Delta F}{\Delta x}$$

    It's dimensions are force per unit Length.

- How do we approach problems that have distributed loading conditions?
    - Calculating the Resultant Force

        One method is to calculate the resultant force on the slender member.

        $$
        \text{For forces acting in a single dimension,}\\
        \text{Resultant Force, }R = \int qdx \\
        \text{Centroid, }\bar{x} = \frac{\int qxdx}{R}
        $$

        where $q(x)$ is the intensity of loading - a function of $x$, the distance from an end of the member.

        These can be obtained by writing the force and moment balance equations twice - once with $R$ and $\bar{x}$ and then with the RHS of the above equations - and comparing them.

        The line of action of the resultant force passes through the centroid.

        The formulae for forces acting in two and three dimensions are also similar.

    - Using Differential Equilibrium Relationships

        <center>
        <table style="table-layout: auto; width: 60%;">
        <tbody>
        <tr><td align="center">
        <img src="/assets/images/differential-relationships-meme.png" alt="Differential Equilibrium Relationships Meme">
        </td></tr>
        </tbody>
        </table>
        </center>

        Consider a very small element of the given slender member, analyse the shear forces and bending moments acting on it and then limit the small segment of length / area / volume to zero. This will give us differential equations that we can integrate to find relationships between forces. Use boundary conditions to find out the values of constants of integration.

        <center>
        <table style="table-layout: auto; width: 60%;">
        <tbody>
        <tr><td align="center">
        <img src="/assets/images/differential-relationships-diagram.png" alt="Free Body Diagram of a Small Slender Member Element">
        </td></tr>
        </tbody>
        </table>
        </center>

        $$
        \Sigma F=0 \\\implies -V+q(x)\Delta x+V+\Delta V=0
        \\\implies q(x)\Delta x+\Delta V=0
        \\\implies q(x)=-\frac{\Delta V}{\Delta x}
        $$

        Also,

        $$
        \Sigma M_A = 0
        \\\implies -M_b + \Delta x\cdot(V+\Delta V) + (M_b + \Delta M_b) = 0
        \\\implies V\Delta x + \Delta V\Delta x + \Delta M_b = 0
        \\\implies V = -\frac{\Delta M_b}{\Delta x}-\Delta V
        $$

        In both the above equations, limiting $\Delta x\to0$ we get, 

        $$
        q(x)=-\frac{dV}{dx}\\
        V(x) = -\frac{dM_b}{dx}
        $$

- What is the relationship between the shear force, bending moment and loading diagrams?
    - The slope of the bending moment curve is the negative ordinate of the shear force curve.
    - The slope of the shear force curve is the negative ordinate of the intensity of loading curve.
- How do we approach problems that have distributed loading conditions but only in some segments, or with different magnitudes?

    Use the method of sections along with either of the two methods above or, use Singularity Functions.

- What are Singularity Functions?

    Singularity functions are defined as,

    $$
    f_n(x)=\langle x - a\rangle^n ={\left\lbrace\begin{matrix}{0}&{\quad\text{if}\quad}{x}\le{a}\\
    (x-a)^n&{\quad\text{if}\quad}{x}\gt{a}\end{matrix}\right.}\;\;(n\ge0)
    $$

    They have the following property,

    $$
    \int_{-\infty}^{x}\langle x-a\rangle^n\;dx = \frac{\langle x-a\rangle^{n+1}}{n+1}\;\;(n\ge0)
    $$

    There are two exceptions:

    $$\int_{-\infty}^{x}\langle x-a\rangle_{-1}dx=\langle x-a\rangle^0$$

    $$\int_{-\infty}^{x}\langle x-a\rangle_{-2}\;dx=\langle x-a\rangle_{-1}$$

    $\langle x-a\rangle_{-1}$ and $\langle x-a\rangle_{-2}$ are zero everywhere except at $x=a$ where they are infinite.

- What do singularity functions represent?
    - $\langle x-a\rangle_{-2}$

        represents a unit concentrated moment.

    - $\langle x-a\rangle_{-1}$

        represents a unit concentrated load. This is also known as the Dirac Delta function in physics.

    - $\langle x-a\rangle^{0}$

        represents a unit step.

    - $\langle x-a\rangle^{1}$

        represents a unit ramp.

    - $\langle x-a\rangle^{2}$

        represents a unit parabolic curve.

- If there are no distributed loads present, where does the maximum bending moment occur?

    It always occurs at a loading point.

    - Why?

        When all forces lie in the same plane, the bending moment diagram consists only of straight line segments. And even when they don't, the bending moment diagram consists only of concave outward curves.

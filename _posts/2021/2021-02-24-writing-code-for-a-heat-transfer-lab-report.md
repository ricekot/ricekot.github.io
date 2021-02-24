---
layout: post
title: "Writing Code For a Heat Transfer Lab Report"
date: 2021-02-24 21:30:00 +0530
tags: notes me-f220
contains_math: true
---

Last night, I was writing a lab report for a Heat Transfer experiment. The experiment was titled "Transient Heat Conduction", where we immersed Aluminium and Brass specimens in hot water and recorded their temperatures at set intervals as they heated up. Then the Aluminium specimen was taken out of the hot water and the process was repeated as it cooled down.

Unfortunately, I could not perform the experiment in person, because of the whole pandemic thing. Our professors and TAs performed the experiment on campus and sent us the recorded readings along with a worksheet. The worksheet had these four exercises in it:
1. Plot the experimentally determined time-temperature record along with temperature determined theoretically at the given time during the heating process of Aluminum specimen.
2. Plot the experimentally determined time-temperature record along with temperature determined theoretically at the given time during the heating process of Brass specimen.
3. Plot the experimentally determined time-temperature record for Aluminum and Brass specimen and compare them.
4. Plot the experimentally determined time-temperature record for cooling of Aluminum specimen.

Plotting the data was the easy part. However, the theoretical calculations (required in exercises 1 and 2) required a lot of iterative calculations and were probably going to be time-consuming if I were to do them by hand. This is where I realised programming could help me!

What was not so obvious to me in the beginning was how I was going to fetch the data that was required for the computations. But then I recalled how there exists a Python Package for almost everything. And sure enough - after searching the web for a couple of minutes, I found the [IAPWS Python module](https://pypi.org/project/iapws/).

I looked at their [documentation](https://iapws.readthedocs.io/en/latest/) for examples and began writing the code. I am not a Python programmer, so please excuse (or better, [let me know](mailto:ricekot@gmail.com) of) any non-idiomatic parts of my code.

```python
import math
from iapws.iapws95 import IAPWS95

def compute(T_initial, T_infinity, length, diameter, n):
    # Convert temperatures to Kelvin
    T_initial = T_initial + 273.15
    T_infinity = T_infinity + 273.15

    print("Iteration\tt(s) \t   h (W/m^2*K)\t\ty")

    # Initialise T_next to T_initial
    T_next = T_initial
    
    for i in range(1, n):
        t = i * 20 # (s) time
        T_film = (T_next + T_infinity) / 2

        water = IAPWS95(T=T_film, x=0)
        beta = water.alfav # (1/K) Isothermal Expansion Coefficient
        nu = water.nu # (m^2/s) Kinematic Viscosity
        k = water.k # (W/m*K) Thermal Conductivity
        Pr = water.Prandt # Prandtl number
        g = 9.81 # (m/s^2) Gravity
        L = length # (m) Length

        Gr = g * beta * (T_infinity - T_next) * L**3 / nu**2 # Grashof Number
        Ra = Gr * Pr # Rayleigh Number
        Nu = 0.1 * Ra**(1/3) # Nusselt Number

        # Convective Heat Transfer Coefficient
        h = Nu * k / L

        # Values to be plotted on the y-axis
        y = (T_next - T_infinity) / (T_initial - T_infinity)

        print("{}\t\t{}\t{}\t{}".format(i,t-20,h,y), end="")
        print("\t\t\tTurbulent Flow" if Ra > 10**9 else "\tLaminar Flow")

        # Set T_next for the next iteration
        alpha = water.alfa # (m^2/s) Thermal Diffusivity
        d = diameter # (m) diameter of cylinder
        Lc = d / 4 # Characteristic dimension of cylinder
        Fo = alpha * (t + 20) / Lc ** 2 # Fourier number
        Bi = h * Lc / k # Biot number
        T_next = math.exp(-Bi * Fo) * (T_initial - T_infinity) + T_infinity

# For Aluminium Specimen
print("Aluminium Specimen:")
compute(30.3, 63.9, 0.1, 0.025, 15)
# For Brass Specimen
print("\nBrass Specimen:")
compute(30.9, 63.6, 0.1, 0.025, 12)
```

I could not confirm whether the values output by this code matched my friends' calculations. If there are any disrepancies, I will correct the code and update this blog post with a note at the top. For now, here is the output of my code and the solutions for all four exercises:

![](/assets/images/2021-02-24-heat-transfer-lab-code-output.png)

**NOTE:** In all plotted graphs, the y-intercept was forced to 1.

$$
\frac{T-T_\infty}{T_i-T_\infty} = \exp{\frac{-t}{\tau}}
$$

## Exercise 1
Plot the experimentally determined time-temperature record along with temperature determined theoretically at the given time during the heating process of Aluminum specimen.  
![](/assets/images/2021-02-24-heat-transfer-lab-exercise-1-data.png)
![](/assets/images/2021-02-24-heat-transfer-lab-exercise-1-graph.png)

It was surprising to see that the theoretical and the experimental curves overlap in this case. This is probably because except for the first four data points, the rest are almost equal.

## Exercise 2
Plot the experimentally determined time-temperature record along with temperature determined theoretically at the given time during the heating process of Brass specimen.  
![](/assets/images/2021-02-24-heat-transfer-lab-exercise-2-data.png)
![](/assets/images/2021-02-24-heat-transfer-lab-exercise-2-graph.png)

## Exercise 3
Plot the experimentally determined time-temperature record for Aluminum and Brass specimen and compare them.  
![](/assets/images/2021-02-24-heat-transfer-lab-exercise-3-data.png)
![](/assets/images/2021-02-24-heat-transfer-lab-exercise-3-graph.png)

The slope of the Brass curve is steeper, which means it reaches thermal equilibrium faster than Aluminium. This is weird because Aluminium is a better thermal conductor than Brass.

## Exercise 4
Plot the experimentally determined time-temperature record for cooling of Aluminum specimen.  
![](/assets/images/2021-02-24-heat-transfer-lab-exercise-4-data.png)
![](/assets/images/2021-02-24-heat-transfer-lab-exercise-4-graph.png)
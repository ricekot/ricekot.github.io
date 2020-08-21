---
layout: post
title: I Found a Bug! 
---

I actually found this bug a long time ago. I had an idea about what I had to do, but I didn't know how I could implement it.  

One of my friends suggested that this could be done easily using python. So, I learnt python. Learning a new programming language isn't difficult, if you know the logic of the basic stuff; you just have to learn the syntax of the new language.

Now let me tell you a little bit about the bug itself, and how I discovered it. So, this certain website requires you to have an account to use it, and in case you forget your password, they provide you with an option to reset it. Standard, right?



1.  You enter your username or your email.

    <img src = "/assets/images/i-found-a-bug_1.png" width="40%">

2.  They send you a four digit code to your email that you enter back on the website.

    <img src = "/assets/images/i-found-a-bug_2.png" width="80%">


    <img src = "/assets/images/i-found-a-bug_3.png" width="40%">

3.  You type in a new password.

    <img src = "/assets/images/i-found-a-bug_4.png" width="40%">

Look at the second step once again. The form that accepts the four digit code can be submitted as many times you want. And this is the bug.  

Okay, AK, so I know what the bug is, now, how can I exploit it? Simple. Just brute force the form ten thousand times (0000 - 9999) until you find the correct code. Now there are two ways you can do this. You can spend the 24 hours (the duration for which the code is valid) and manually enter these numbers or you can write a computer program to make your life easier. That's exactly what I did. 

<center>
<table style="table-layout: auto; width: 50%;">
<tbody>

<tr><td align="center">
<img src = "/assets/images/i-found-a-bug_5.gif">
</td></tr>

<tr><td align="center">
the exploit in action
</td></tr>

</tbody>
</table>
</center>

The only boring part of this program is the waiting. On an average, it takes about fifteen minutes to cycle through all the numbers before finding the correct one. Better spend these fifteen minutes wisely. I suggest watching three episodes of [Saiki Kusuo no Ψ-nan](https://myanimelist.net/anime/33255/Saiki_Kusuo_no_Ψ-nan).  

Anyways, I really enjoyed making this program and this is also how I was introduced to python.  

Side Note: Exams are coming up. As much as I hate them, I have to study for them. But I think I will find enough time to keep updating this blog. So I guess you can look forward to more posts from now onwards.


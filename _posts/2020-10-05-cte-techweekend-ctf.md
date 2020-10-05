---
layout: post
title: CTE TechWeekend CTF 2020
---

I spent the past weekend solving challenges from CTE TechWeekend CTF, and I had a blast. The difficulty of the challenges was just above what I'm used to, but I managed to solve them all and bag first place 😀. Thanks to the organisers, [Team BITSKrieg](https://ctftime.org/team/22310) and [CTE](https://bpgc-cte.org/) for organising this lovely event!

![Scoreboard Screenshot](/assets/images/cte-ctf-scoreboard.png)

Since this is the first time I'm writing a CTF writeup, I decided to follow the tips given [here](https://pequalsnp-team.github.io/cheatsheet/writing-good-writeup).

Here's my approach to some challenges that I had the most fun with:

1.

| Challenge Name:        | fives...fives...fives                                                  |
| :--------------------- | :--------------------------------------------------------------------- |
| Challenge Description: | What Is Seen Is Temporary, But What Is Unseen Is Eternal.              |
| Challenge Category:    | Reverse Engineering                                                    |
| Challenge Points:      | 497                                                                    |
| TL; DR:                | Use Ghidra to analyse the provided binary and rewrite logic in Python. |

The first thing I did was check the file type. Then, I imported it into Ghidra's CodeBrowser and looked at the decompiled code for the `main` function. The program basically performed some operations on a hardcoded array, and then checked the input against it. If we passed the flag to the program, it would congratulate us. At the time, I simply wrote the decompiled code in Python - which was about 27 lines - without thinking too much about it. However, when writing this post, I realised that the operation was actually pretty straightforward, and it also explained the challenge name and the flag:

```python
arr = [0x195, 0x140, 0x15e, 0x181, 0x19a, 0x186, 0x177, 0x145, 0x276, 0xf0,
       0x235, 0xf5, 0x26c, 0x1c2, 0x181, 0x109, 0x208, 0x10e, 0x1c2, 0x177,
       0x1c2, 0xf0, 0x235, 0xf5, 0x26c, 0x1c2, 0x1d1, 0x109, 0x1b3, 0x1b3,
       0x10e, 0x1e5, 600]

print(''.join([chr(int(i/5)^5) for i in arr]))
```
> TECHWKND{5t4y_H0m3_N_5t4y_X0RR3d}

What I'd like to do next: Read about reverse engineering, learn assembly, improve my code reading comprehension.

2.

| Challenge Name:        | My Private Message                                                                      |
| :--------------------- | :-------------------------------------------------------------------------------------- |
| Challenge Description: | I forget what the opposite of compile was. I'm sure it was *something*-compile.         |
| Challenge Category:    | Cryptography                                                                            |
| Challenge Points:      | 448                                                                                     |
| TL; DR:                | Decompile the given .pyc file, convert the hardcoded array as: decimal -> hex -> ASCII. |

I felt that this challenge was similar to the above one. I decompiled the given "message.pyc" file by uploading it to [python-decompiler.com](https://python-decompiler.com/). The program encrypted the input string and compared it against a hardcoded array. It was just a matter of figuring out the encryption algorithm. The input string was being converted to hexadecimal which was then converted to decimal. The decryption algorithm was just the reverse of this.

```python
encoded = [361939290199, 323435658101, 474110520688, 521506348907,
           473259521375, 512849360735, 212055061040, 237085094704,
           409954706557]

print(bytearray.fromhex(''.join([hex(i)[2:] for i in encoded])).decode())
```
> TECHWKND{unc0mpyl3_kn0w5_wh47_1_wr073_s0_s4d}

It seems from the flag that they expected me to use a package called [uncompyle](https://pypi.org/project/uncompyle6/) to decompile the given file.

What I'd like to do next: Read about the implementation of uncompyle.

3.

| Challenge Name:        | The Bourne Identity                         |
| :--------------------- | :------------------------------------------ |
| Challenge Description: | Jesus Christ, it's JSON Bourne              |
| Challenge Category:    | Web                                         |
| Challenge Points:      | 257                                         |
| TL; DR:                | Inject JSON to overwrite the "admin" value. |

From the provided `index.js` file, here is all we need to solve the challenge:

```js
var data= '{"admin":"no", "user":"'+request.body.uname+'", "pass":"'+request.body.psw+'"}';
var obj= JSON.parse(data)
var hash= crypto.MD5(obj.pass)

if (obj.user=="\x4a\x42\x6f\x75\x72\x6e\x65" && hash=="a883241dd51bda403ae5d9eb14e41331")
{
       if(obj.admin=="yes")
       {
              response.send('<h2>ACCESS GRANTED</h2><br><p>'+process.env.FLAG+'</p>');
       }
}
```

Converting the username from hex to ASCII and decrypting the MD5 hash, we get the following user credentials:

```
user: JBourne
pass: mattdamon
```

However, this isn't enough. We also need to somehow set `obj.admin="yes"`. If we provide the following credentials,

```
user: JBourne", "admin":"yes
pass: mattdamon
```

Here's what the variable `data` would look like:

```js
data = '{"admin":"no", "user":"JBourne", "admin":"yes", "pass":"mattdamon"}';
```

This will get us the flag,
> TECHWKND{b0uRN3_2_h4Ck_Gq9jh}

Note that we cannot inject JSON in place of the password, because it is being hashed and compared.

I liked these challenges because these couldn't be solved with just a tool and required some thinking. I used many tools in this competition, and I would like to read more about their implementations next. All in all, I think this CTF was a great experience and I would definitely participate again.

# How to handle password storing and resetting

### Part 1: Store the password

Pass word are very important to user and the web application so we should never return back or store plain text password as it is, we need a kind of protection algorithum which only we know how to convert back from a very complicated set of characters.

1.Hash the password before saving it.

There are many third-party packages which takes care of hashing. For open source application we can use them as our hashing algorithum, but we can also come up with our own methods as well.

```bash
npm i bcrypt
```


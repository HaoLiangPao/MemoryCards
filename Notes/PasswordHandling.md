# How to handle password storing and resetting

## Part 1: Store the password

Pass word are very important to user and the web application so we should never return back or store plain text password as it is, we need a kind of protection algorithum which only we know how to convert back from a very complicated set of characters.

1. Hash the password before saving it.

There are many third-party packages which takes care of hashing. For open source application we can use them as our hashing algorithum, but we can also come up with our own methods as well.

```bash
npm i bcrypt
```

2. Create a static methods which takes care of matching `user-typed-password` with `hashed-password`

```javascript
// Compare the password with the hashed ones in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
```

---

## Part 2: Jason Web Token (Authorization Procedure: Login - Logout)

### Terminology: 

##### **1.Authentification:**

It makes sure the user trying to login has the same credencials as the record stored in the database, and then authenticate this user to gain access to the database.

| Take in  | Return out |
| -------- | ---------- |
| Username | Boolean    |
| Password |            |

##### **2.Authorization:**

It makes sure the user who sends the request is the same user that logged in (complete authentification), and then authorize this use to a particular system

| Take in                      | Return out |
| ---------------------------- | ---------- |
| Session ID (traditional way) | Boolean    |
| Jason Web Token (morden way) |            |



### Process:

1.Sign the token when loged in

```javascript
const jwt = require('jasonwebtoken')
jwt.sign(data, secret, options);
```

Run node terminal, use crypto package to generate some random 64 bytes hexdicimal string as a secure **JWT_SECRET**
```bash
node
>
> require('crypto').randomBytes(64).toString('hex')
```








class User {
  constructor(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  getInfo() {
    return `${this.name} - ${this.age} years old - Email: ${this.email}`;
  }
}

class UserBuilder {
  constructor() {
    this.user = new User("", 0, "");
  }

  setName(name) {
    this.user.name = name;
    return this;
  }

  setAge(age) {
    this.user.age = age;
    return this;
  }

  setEmail(email) {
    this.user.email = email;
    return this;
  }

  build() {
    const builtUser = this.user;
    this.user = new User("", 0, "");
    return builtUser;
  }
}

class UserManager {
  constructor(builder) {
    this.builder = builder;
  }

  createUser(name, age, email) {
    return this.builder.setName(name).setAge(age).setEmail(email).build();
  }

  sendWelcomeEmail(user) {
    // Логіка відправки листа з вітанням на електронну пошту
    console.log(`Welcome email sent to ${user.email}`);
  }
}

const generateUsers = (configArray) => {
  const builder = new UserBuilder();
  const userManager = new UserManager(builder);
  const users = configArray.map((config) =>
    userManager.createUser(
      config.name || "",
      config.age || 0,
      config.email || ""
    )
  );
  users.forEach((user) => console.log(user.getInfo()));
  return users;
};

const userConfigs = [
  { name: "Alice", age: 25, email: "alice@example.com" },
  { name: "Bob", age: 30, email: "bob@example.com" },
  { name: "Charlie", age: 22, email: "charlie@example.com" },
];
const createdUsers = generateUsers(userConfigs);

// Приклад використання менеджера користувачів для надсилання листа з вітанням
const userManager = new UserManager(new UserBuilder());
createdUsers.forEach((user) => userManager.sendWelcomeEmail(user));

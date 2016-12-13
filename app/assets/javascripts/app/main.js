import Hello from './Hello'

class Stuff {
  constructor () {
    this.hello = new Hello();
    this.say();
  }
  say () {
    this.hello.greet();
  }
}

new Stuff();

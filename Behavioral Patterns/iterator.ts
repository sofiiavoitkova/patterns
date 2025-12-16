class Profile {
  constructor(private id: string, private email: string) {}

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }
}

interface ProfileIterator {
  hasNext(): boolean;
  getNext(): Profile;
}

interface SocialNetwork {
  createFriendsIterator(profileId: string): ProfileIterator;
}

class Facebook implements SocialNetwork {
  private profiles: Profile[] = [
    new Profile("1", "a@mail.com"),
    new Profile("2", "b@mail.com"),
    new Profile("3", "c@mail.com"),
  ];

  createFriendsIterator(profileId: string): ProfileIterator {
    return new FacebookIterator(this.profiles);
  }
}

class FacebookIterator implements ProfileIterator {
  private index = 0;

  constructor(private profiles: Profile[]) {}

  hasNext(): boolean {
    return this.index < this.profiles.length;
  }

  getNext(): Profile {
    return this.profiles[this.index++];
  }
}

class SocialSpammer {
  send(iterator: ProfileIterator, message: string): void {
    while (iterator.hasNext()) {
      const profile = iterator.getNext();
      console.log(`Send email to ${profile.getEmail()}: ${message}`);
    }
  }
}

const network: SocialNetwork = new Facebook();
const spammer = new SocialSpammer();

const iterator = network.createFriendsIterator("1");
spammer.send(iterator, "Very important message");

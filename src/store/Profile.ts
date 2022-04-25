import {action, makeAutoObservable} from 'mobx';

import {ProfileService} from '../services';
import ErrorMessages from '../errorMessages';

import {Author} from './types';

class ProfileStore {
  isLoading = false;
  error?: string = undefined;
  profile?: Author = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  loadProfile(username: string) {
    if (this.profile?.username === username) return;

    this.isLoading = true;

    ProfileService.get(username)
      .then(
        action(({profile}) => {
          this.profile = profile;
        })
      )
      .catch(
        action((err) => {
          console.error(err);
          this.error = ErrorMessages.default;
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }

  follow() {
    if (this.profile && !this.profile.following) {
      this.profile.following = true;

      ProfileService.follow(this.profile.username).catch(
        action(() => {
          if (this.profile) {
            this.profile.following = false;
          }

          throw Error();
        })
      );
    }
  }

  unfollow() {
    if (this.profile && this.profile.following) {
      this.profile.following = false;

      ProfileService.unfollow(this.profile.username).catch(
        action(() => {
          if (this.profile) {
            this.profile.following = true;
          }

          throw Error();
        })
      );
    }
  }
}

export default new ProfileStore();

import Realm, { BSON } from 'realm';
import {createRealmContext} from '@realm/react';

class Album extends Realm.Object {
  static schema = {
    name: 'Album',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectID()},
      title: 'string',
      artist: 'string',
      cover: 'string',
    },
    primaryKey: '_id',
  };
}

export const {useRealm, useQuery, RealmProvider} = createRealmContext({
  schema: [Album],
  schemaVersion: 5
});
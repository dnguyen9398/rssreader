import { ToastAndroid } from 'react-native';
import Realm from 'realm';

class FeedsSchema extends Realm.Object{}
FeedsSchema.schema={
    name: 'Feeds',
    primaryKey: 'id',
    properties:{
        id : 'int',
        data: 'string'
    }
}
let realm = new Realm({
    path: 'feeds.realm',
    schema: [FeedsSchema],
    schemaVersion: 1
});

let getAllFeeds= () => {
    console.log(realm.objects('Feeds'))
    return realm.objects('Feeds');
}



let addFeeds = (_data) => {
    realm.write(()=>{
        const results = realm.objects('Feeds').sorted('id');
        const _id = results.length > 0 ? results[results.length - 1].id + 1 : 1;
        const feeds = realm.create('Feeds', {
            id: _id,
            data: _data
        });
    });
}

let getFeedsbyID = (id) => {
    const feeds = realm.objectForPrimaryKey(FeedsSchema, id)
    return feeds
}
let deleteAllFeeds = () => {
    realm.write(()=>{
        realm.delete(getAllFeeds()); 
    })
}
let deleteByID = (id) =>{
    realm.write(() => {
        realm.delete(getFeedsbyID(id))
    })
  }
export {
    getAllFeeds,
    getFeedsbyID,
    addFeeds,
    deleteAllFeeds,
    deleteByID,
  }
import {Record, List} from 'immutable';

const _reviveProps = ({...props}) => {
  // console.log('reviveProps PROPS: ' , props);
  if (typeof props.todos !== 'undefined' && props.todos.length > 0) {
    props.todos = List(props.todos);
  }
  return props;
}

const UserRecord = new Record({
    name: undefined,
    todos: new List()
});

export default class User extends UserRecord {
  constructor(props) {
    super(_reviveProps(props))
  }
}

/**
 * Plus tard dans le code, lorsqu'on aura recupéré un utilisateur depuis
 * base données ou le serveur sous format objet javascript, on va le transformer en immutable
 * (record).
 */
// const immUser = new User(plainJavascriptObjectFromDB);



























// import Immutable from 'immutable';

// const _reviveProps = ({ ...props }) => {
//   if (!props._id)  props._id = `user_${new Date().toISOString()}`;
//   props.handlerCode = `${props.id}/${props.prenom}`.toLowerCase();
//   /*
//     initialiser les objets immutables
//   */
//   if (props) {
//     const { adress, passwd, lastConnection } = props;
//     if (adress)
//       props.adress = Immutable.Map(props.adress);
//     if (passwd)
//       props.passwd = Immutable.Map(props.passwd);
//     if (lastConnection) {
//       const { device } = props.lastConnection;
//       if (device)
//         props.lastConnection.device = Immutable.Map(device);
//       props.lastConnection = Immutable.Map(lastConnection);
//     }
//     return props;
//   }
// };
// const UserRecord = Immutable.Record({
//   _id: undefined, // data_type_created ( new Date().toISOString() ) // voir si ajout du code barre
//   _rev: undefined,
//   _deleted: undefined,
//   id: undefined,
//   code: undefined, //  code de base passée par le serveur ( eventuellement )
//   schema: 'v1.0',
//   type: 'user',
//   deleted: undefined, // default response
//   created: new Date().toISOString(),
//   modified: new Date().toISOString(),
//   originalId: undefined,
//   active: true, // true / false
//   group: 'user',
//   nom: undefined,
//   prenom: undefined,
//   email: undefined,
//   tel: undefined,
//   commentaire: undefined,
//   handlerCode: undefined,
//   adress: Immutable.Map({
//     numero: undefined,
//     rue: undefined,
//     cp: undefined,
//     ville: undefined,
//   }),
//   lastConnection: Immutable.Map({
//     date: new Date().toISOString(),
//     nowLoggedIn: false,
//     device: Immutable.Map({
//       _id: undefined,
//       os: undefined,
//       ip: undefined,
//       designation: undefined
//     }),
//   }),
//   passwd: Immutable.Map({
//     codeNumeric: undefined, // généré ou code bar ?
//     codebar: undefined,
//     dallasCode: undefined,
//     pattPassword: undefined, // teleco
//   }),
//   commPassword: undefined, // téléco,
//   dallas: undefined, // téléco,
//   siteOrigin: undefined
// });
// export default class User extends UserRecord {
//   constructor(props) {
//     super(_reviveProps(props));
//   }
//   isConnected() {
//     return this.lastConnection.get('nowLoggedIn') === true;
//   }
//   getConnectionState() {
//     return this.lastConnection.get('nowLoggedIn');
//   }
//   getHandlerCode() {
//     return this.handlerCode;
//   }
//   getNomPrenom() {
//     const arrayString = `${this.nom} ${this.prenom}`.split(' ');
//     return arrayString.map(item => StringHelper(item).capitalize().s).join(' ');
//   }
//   getSearchString() {
//     return this.code.concat(this.nom, this.prenom, this.email).toLowerCase();
//     // return arrayString.map(item => StringHelper(item).capitalize().s).join(' ');
//   }
//   belongToGroup(groups = false) {
//     const data = (typeof groups === 'string') ? [groups] : groups;
//     return data.indexOf(this.group) >= 0;
//   }
//   isActive() {
//     return this.active;
//   }
//   getUserWithLastModified() {
//     return this.update('modified', () => new Date().toISOString())
//   }
//   // setGroup(grp) { this.group = grp; }
// }

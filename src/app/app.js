const Mixer = require('beam-client-node');
const ws = require('ws');
let userInfo;
const client = new Mixer.Client(new Mixer.DefaultRequestRunner());

// With Oauth we don't need to log in. The Oauth Provider will attach
// the required information to all of our requests after this call.
client.use(new Mixer.OAuthProvider(client, {
    tokens: {
        access: '1ZPY5VtKjIVOAUVD7fKSJCM3GQqUJd69RVBy98z3EI61vXIIxquW9Ba0l4uJyQp5',
        expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
    },
}));
// Gets the user that the Access Token we provided above belongs to.
client.request('GET', 'users/current')
.then(response => {
    console.log(response.body);

    // Store the logged in user's details for later reference
    userInfo = response.body;

    // Returns a promise that resolves with our chat connection details.
    return new Mixer.ChatService(client).join(response.body.channel.id);
})
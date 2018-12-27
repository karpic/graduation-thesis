import Home from './components/Home.vue';
import SignIn from './components/SignIn.vue';
import Compose from './components/messages/Compose.vue';
import AllMessages from './components/messages/AllMessages.vue';
import Inbox from './components/messages/Inbox.vue';
import MessagePreview from './components/messages/MessagePreview.vue';

export const routes = [
    { 
        path: '/home', 
        component: Home,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'compose',
                name: 'compose',
                component: Compose,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'all',
                name: 'allMessages',
                component: AllMessages,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'inbox',
                name: 'inboxMessages',
                component: Inbox,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'message/:id',
                name: 'messagePreview',
                component: MessagePreview,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/signin',
        component: SignIn,
        meta: {
            requiresAuth: false
        }
    }
]
import Home from './components/Home.vue';
import SignIn from './components/SignIn.vue';
import Compose from './components/messages/Compose.vue';
import AllMessages from './components/messages/AllMessages.vue';
import Inbox from './components/messages/Inbox.vue';
import MessagePreview from './components/messages/MessagePreview.vue';
import Starred from './components/messages/Starred.vue';
import Sent from './components/messages/Sent.vue';
import Trash from './components/messages/Trash.vue';
import Important from './components/messages/Important.vue';
import Spam from './components/messages/Spam.vue';
import Draft from './components/messages/Draft.vue';
import Unread from './components/messages/Unread.vue';

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
                path: 'unread',
                name: 'unreadMessages',
                component: Unread,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'starred',
                name: 'starredMessages',
                component: Starred,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'sent',
                name: 'sentMessages',
                component: Sent,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'trash',
                name: 'trashMessages',
                component: Trash,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'important',
                name: 'importantMessages',
                component: Important,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'spam',
                name: 'spamMessages',
                component: Spam,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'draft',
                name: 'draftMessages',
                component: Draft,
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
    },
    {
        path: '/',
        component: SignIn,
        meta: {
            requiresAuth: false
        }
    }
]
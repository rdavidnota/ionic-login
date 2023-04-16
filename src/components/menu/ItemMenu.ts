import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp } from 'ionicons/icons';

interface ItemMenu {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

export const ItemMenuList: ItemMenu[] = [
    {
        title: 'Inbox',
        url: '/folder/Inbox',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Outbox',
        url: '/folder/Outbox',
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
    },
];
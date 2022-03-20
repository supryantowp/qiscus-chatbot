export interface WebhookEvent {
    from: From
    message: EventMessage
    room: Room
}

export interface Room {
    id: number
    id_str: string
    options: any
}

export interface From {
    id: number;
    id_str: string
    email: string
    name: string
}

export type EventMessage =
    | TextMessage
    | ImageMessage
    | ListReplyMessage
    | ButtonReplyMessage;

export type TextMessage = MessageBase & {
    type: "text";
    text: {
        body: string;
    };
};

export type ListReplyMessage = MessageBase & {
    type: "interactive";
    interactive: {
        list_reply: {
            description: string;
            id: string;
            title: string;
        };
        type: "list_reply";
    };
};

export type ButtonReplyMessage = MessageBase & {
    type: "button_postback_response";
    interactive: {
        button_reply: {
            id: string;
            title: string;
        };
        type: "button_reply";
    };
};

export type ImageMessage = MessageBase & {
    type: "image";
    image: {
        id: string;
        mime_type: string;
        sha256: string;
    };
};

export interface MessageBase {
    comment_before_id: number
    created_at: string
    disable_link_preview: boolean
    extras: any
    id: number
    id_str: string
    text: string
    timestamp: string;
    type: string;
}

export interface UserState {
    scene: string;
}

export interface UserInfoState {
    full_name?: string
    email_address?: string
    phone_number?: string
    zodiak?: string
    industry?: string
    demo_product_type?: string
    metrics?: string
}
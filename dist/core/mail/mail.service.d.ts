import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly config;
    private readonly logger;
    private transporter;
    constructor(config: ConfigService);
    sendMail(params: {
        to: string;
        subject: string;
        html: string;
    }): Promise<void>;
}

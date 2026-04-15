import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true})
export class Log {
    @Prop({
        require: true 
    })
    serviceName: string;

    @Prop({
        required: true,
        enum: ['info', 'warn', 'error', 'debug']
    })
    level: string;

    @Prop({
        required: true
    })
    message: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
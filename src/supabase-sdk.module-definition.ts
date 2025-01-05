import { ConfigurableModuleBuilder } from '@nestjs/common';

export class SupabaseSdkModuleOptions {
  auth: {
    url: string;
    key: string;
  };
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<SupabaseSdkModuleOptions>().build();

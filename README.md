# nestjs-supabase

## Installation

To install the package, run:
```bash
npm i @nestixis/nestjs-supabase
```

## Registration

To register the module in your application, you can use the `SupabaseSdkModule.registerAsync` method with a factory pattern:

```typescript
import { SupabaseSdkModule } from "@nestixis/nestjs-supabase";
import { ConfigModule, ConfigService } from "@nestjs/config";

SupabaseSdkModule.registerAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    auth: {
      url: configService.get<string>('SUPABASE_AUTH_URL'),
      key: configService.get<string>('SUPABASE_SERVICE_ROLE_KEY'),
    },
  }),
  inject: [ConfigService],
});
```

## Usage

To use the Supabase client in your service, inject it using the `SUPABASE_SDK_CLIENT` token:

```typescript
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';
import { SUPABASE_SDK_CLIENT } from '@nestixis/nestjs-supabase';

@Injectable()
export class YourService {
  constructor(
    @Inject(SUPABASE_SDK_CLIENT) private readonly supabaseClient: SupabaseClient
  ) {}

  async yourMethod() {
    const { data, error } = await this.supabaseClient
      .from('your_table')
      .select('*');
    if (error) {
      throw error;
    }
    return data;
  }
}
```
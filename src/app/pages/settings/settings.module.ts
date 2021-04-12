import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedlModule } from 'src/app/common/modules/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { TelegramComponent } from './telegram/telegram.component';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent, ChangePasswordComponent, TelegramComponent],
  imports: [CommonModule, SettingsRoutingModule, SharedlModule, ReactiveFormsModule],
})
export class SettingsModule {}

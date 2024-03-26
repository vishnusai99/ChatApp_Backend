import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('search/:query')
  async searchUsers(@Param('query') query: string): Promise<any[]> {
    const users = await this.profileService.searchUsers(query);
    return users;
  }
  @Get('get/:uid')
  async getProfile(@Param('uid') uid: string): Promise<any[]> {
    const user = await this.profileService.getProfile(uid);
    return user;
  }
}

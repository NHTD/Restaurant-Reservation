import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtUserInterface } from "src/interfaces/jwt-user.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'asglhakgshkashgkashgkahgskahgsạgaskhgkajsghklaghskjsahgkl',
    });
  }

  async validate(payload: JwtUserInterface) {
    await Promise.resolve();
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles
    };
  }
}

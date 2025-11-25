package Cis.api.infra.service;

import Cis.api.domain.dtos.request.TokenDtoRequest;
import Cis.api.domain.dtos.response.TokenDtoResponse;
import Cis.api.domain.entity.Usuario;
import Cis.api.infra.Config.Roles;

public interface UsuarioService {


    Usuario criarUsuario(TokenDtoRequest dto, Roles role);
}

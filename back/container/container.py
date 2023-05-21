from dependency_injector import containers, providers
from repository.usuario_repository import UsuarioRepository
from service.usuario_service import UsuarioService
from repository.grupo_repository import GrupoRepository
from service.grupo_service import GrupoService
from repository.inscricao_repository import InscricaoRepository
from service.inscricao_service import InscricaoService
from repository.partida_repository import PartidaRepository
from service.partida_service import PartidaService
from repository.pontuacao_repository import PontuacaoRepository
from service.pontuacao_service import PontuacaoService
from repository.set_repository import SetRepository
from service.set_service import SetService
from repository.torneio_repository import TorneioRepository
from service.torneio_service import TorneioService


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules=[".", "extension", "init_value", "service", "rest_controller", "repository"],
        packages=[".", "extension", "init_value", "service", "rest_controller", "repository"],
    )

    config = providers.Configuration()

    # Repositories
    usuario_repository = providers.Factory(
        UsuarioRepository
    )

    grupo_repository = providers.Factory(
        GrupoRepository
    )

    inscricao_repository = providers.Factory(
        InscricaoRepository
    )

    partida_repository = providers.Factory(
        PartidaRepository
    )

    pontuacao_repository = providers.Factory(
        PontuacaoRepository
    )

    set_repository = providers.Factory(
        SetRepository
    )

    torneio_repository = providers.Factory(
        TorneioRepository
    )

    # Services
    usuario_service = providers.Factory(
        UsuarioService,
        repository=usuario_repository,
    )

    grupo_service = providers.Factory(
        GrupoService,
        repository=grupo_repository,
    )

    inscricao_service = providers.Factory(
        InscricaoService,
        repository=inscricao_repository,
        partida_repository=partida_repository,
    )

    partida_service = providers.Factory(
        PartidaService,
        repository=partida_repository,
    )

    pontuacao_service = providers.Factory(
        PontuacaoService,
        repository=pontuacao_repository,
    )

    set_service = providers.Factory(
        SetService,
        repository=set_repository,
    )

    torneio_service = providers.Factory(
        TorneioService,
        repository=torneio_repository,
    )
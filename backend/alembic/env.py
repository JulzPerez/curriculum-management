from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# ── Load app config and models ────────────────────────────────────────────────
from app.core.config import settings

# Import Base and ALL models so Alembic can detect them for autogenerate.
# When you add a new model, import it here too.
from app.db.base_class import Base
import app.db.base  # noqa: F401 — registers User, PerformanceIndicator with Base
from app.models.indicator import Indicator  # noqa: F401

# ── Alembic config ────────────────────────────────────────────────────────────
config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Point Alembic at the app's metadata so --autogenerate works
target_metadata = Base.metadata

# Override the DB URL from app settings (ignores the blank value in alembic.ini)
config.set_main_option("sqlalchemy.url", settings.SQLALCHEMY_DATABASE_URL)


# ── Migration runners ─────────────────────────────────────────────────────────
def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

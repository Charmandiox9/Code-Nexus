FROM python:3.11-slim

# Crear usuario no-root para seguridad
RUN useradd -m -s /bin/bash sandboxuser

WORKDIR /app

# Instalar dependencias del sistema: compiladores y herramientas
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    wget \
    default-jdk \
    g++ \
    postgresql-client \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g typescript ts-node \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instalar Rust via rustup (versión estable, evita el rustc desactualizado de apt)
ENV RUSTUP_HOME=/usr/local/rustup \
    CARGO_HOME=/usr/local/cargo \
    PATH=/usr/local/cargo/bin:$PATH
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --no-modify-path --default-toolchain stable \
    && chmod -R a+rwx /usr/local/rustup /usr/local/cargo

# Instalar dependencias de Python (pika para RabbitMQ)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el worker
COPY worker.py .

# Cambiar al usuario no-root
USER sandboxuser

CMD ["python", "worker.py"]

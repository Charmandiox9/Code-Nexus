FROM python:3.11-slim

# Crear un usuario no root para mayor seguridad (evita escalar privilegios)
RUN useradd -m -s /bin/bash sandboxuser

WORKDIR /app

# Instalar nodejs, compiladores y herramientas (PostgreSQL-client)
RUN apt-get update && apt-get install -y \
    curl \
    default-jdk \
    g++ \
    rustc \
    postgresql-client \
    wget \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g typescript ts-node \
    && apt-get clean

# Instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el script del worker
COPY worker.py .

# Cambiar al usuario no root antes de ejecutar
USER sandboxuser

CMD ["python", "worker.py"]

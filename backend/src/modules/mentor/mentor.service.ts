import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MentorService {
  private readonly logger = new Logger(MentorService.name);

  async generateHint(code: string, errorMessage: string): Promise<string> {
    this.logger.log('Analizando error con IA Mentor (Nexus)...');

    // Aquí iría la integración real con OpenAI / Gemini
    // Por ahora, usamos un análisis heurístico (Mock LLM) para la MVP
    
    const errorLower = errorMessage.toLowerCase();

    if (errorLower.includes('syntaxerror')) {
      return '¡Ups! Tienes un error de sintaxis. Esto suele pasar cuando olvidas cerrar un paréntesis `()`, comillas `""`, o te falta un bloque `:` al final de una condición.';
    }
    
    if (errorLower.includes('nameerror')) {
      return 'Parece que estás intentando usar una variable o función que no existe. Revisa si escribiste bien el nombre o si olvidaste declararla antes de usarla.';
    }

    if (errorLower.includes('typeerror')) {
      return '¡Cuidado con los tipos! Estás intentando operar con datos incompatibles (por ejemplo, sumar un texto con un número). Usa `str()` o `int()` para convertir los datos si es necesario.';
    }

    if (errorLower.includes('indentationerror')) {
      return 'En Python los espacios son súper importantes. Revisa la sangría (los espacios a la izquierda) de tu código. Asegúrate de que todo esté alineado correctamente.';
    }

    // Default genérico
    return 'He analizado tu código y parece haber un problema. Revisa cuidadosamente el mensaje de error en la terminal para encontrar la pista clave. ¡No te rindas!';
  }

  async generateProAnalysis(userId: string, code: string, task: string, errorMessage: string): Promise<string> {
    this.logger.log(`[PRO] Analizando código profundamente para el usuario ${userId}...`);
    
    let specificAnalysis = '';
    const errorLower = errorMessage.toLowerCase();

    // Intentar extraer número de línea
    const lineMatch = errorMessage.match(/line\s+(\d+)/i) || errorMessage.match(/:(\d+):/);
    const lineInfo = lineMatch ? `\nEl error ocurre cerca de la línea **${lineMatch[1]}**.` : '';

    // Intentar extraer variables/tokens involucrados
    const tokenMatch = errorMessage.match(/'([^']+)'/);
    const tokenInfo = tokenMatch ? ` Parece estar relacionado con \`${tokenMatch[1]}\`.` : '';

    if (errorLower.includes('syntaxerror')) {
      specificAnalysis = `**Problema Detectado:** Error de sintaxis.${lineInfo}\nEl compilador no puede interpretar la estructura. Revisa detenidamente esa línea buscando paréntesis sin cerrar, faltas ortográficas o problemas de indentación.`;
    } else if (errorLower.includes('nameerror') || errorLower.includes('referenceerror') || errorLower.includes('not defined')) {
      specificAnalysis = `**Problema Detectado:** Referencia a un elemento inexistente.${lineInfo}${tokenInfo}\nEstás usando una variable o función que el programa no reconoce en ese alcance. Asegúrate de haberla declarado e inicializado correctamente antes de usarla.`;
    } else if (errorLower.includes('typeerror')) {
      specificAnalysis = `**Problema Detectado:** Incompatibilidad de tipos.${lineInfo}${tokenInfo}\nEstás intentando realizar una operación entre tipos incompatibles (por ejemplo, acceder a una propiedad de \`null\` o sumar un texto a un objeto).`;
    } else if (errorLower.includes('indentationerror')) {
      specificAnalysis = `**Problema Detectado:** Error de indentación.${lineInfo}\nEn lenguajes como Python, el espaciado es crucial. Asegúrate de que los bloques (dentro de if, for, def) tengan la sangría correcta.`;
    } else {
      specificAnalysis = `**Problema Detectado:** Error general de ejecución.${lineInfo}\nRevisa el Stack Trace en el mensaje de error: \n\`${errorMessage.substring(0, Math.min(150, errorMessage.length))}...\`\nSuele indicar exactamente por qué falló la lógica.`;
    }

    // Mock de un análisis profundo generado por IA
    return `### 🧠 Análisis Profundo (NexBot PRO)

He analizado tu código (\`${code.split('\\n').length}\` líneas) para el reto "${task}".

**1. Análisis del Error Actual:**
${specificAnalysis}

**2. Inspección de tu Código:**
Analizando tu lógica, el fallo no es solo un error tipográfico, sino que el flujo de datos se interrumpe justo antes de donde crees. Te recomiendo imprimir las variables justo antes de la línea conflictiva.

**3. Optimización Estructural Sugerida:**
- Independientemente del error, tienes lógica que podría simplificarse. Trata de consolidar operaciones repetitivas usando funciones integradas.
- Los nombres de tus variables podrían ser más descriptivos para ayudarte a seguir el flujo de los datos.

**4. Prevención de Casos Borde:**
Asegúrate siempre de validar la entrada. Por ejemplo, si el input es nulo o una lista vacía, tu programa podría romperse incluso si corriges el error actual. Añade guardas defensivas al inicio de tu función.

¡Sigue iterando! Con este nivel de detalle estás muy cerca de resolver el reto de forma óptima.`;
  }
}

// News Articles Data
const newsArticles = [
    {
        id: 'melena-leon-memoria',
        icon: '🧠',
        title: 'Melena de León Mejora la Memoria y Concentración',
        category: 'Neurociencia',
        tags: ['Neurociencia', 'Estudios 2024'],
        date: '2024-01-15',
        shortDescription: 'Estudios recientes de 2024 demuestran que la Melena de León estimula la producción de NGF (Factor de Crecimiento Nervioso), mejorando significativamente la función cognitiva, memoria y enfoque.',
        fullContent: `
      <h3>🧠 El Hongo que Potencia tu Cerebro</h3>
      <p>La Melena de León (Hericium erinaceus) está revolucionando el campo de la neurociencia con sus extraordinarios beneficios para la salud cerebral. Investigaciones recientes de 2024 han confirmado lo que las medicinas tradicionales asiáticas conocían desde hace siglos: este hongo es un poderoso aliado para la función cognitiva.</p>

      <h3>🔬 Descubrimientos Científicos Recientes</h3>
      <p><strong>Estimulación del NGF:</strong> El hallazgo más significativo es la capacidad de la Melena de León para estimular la producción del Factor de Crecimiento Nervioso (NGF). Este compuesto es esencial para:</p>
      <ul>
        <li>✓ Crecimiento y mantenimiento de neuronas</li>
        <li>✓ Formación de nuevas conexiones neuronales</li>
        <li>✓ Protección contra el deterioro cognitivo</li>
        <li>✓ Mejora en la plasticidad cerebral</li>
      </ul>

      <h3>💡 Beneficios Comprobados</h3>
      <p><strong>Memoria y Aprendizaje:</strong></p>
      <ul>
        <li>Mejora significativa en la memoria a corto y largo plazo</li>
        <li>Mayor capacidad de retención de información</li>
        <li>Aprendizaje más rápido y efectivo</li>
      </ul>

      <p><strong>Concentración y Enfoque:</strong></p>
      <ul>
        <li>Aumento en la capacidad de atención sostenida</li>
        <li>Reducción de la fatiga mental</li>
        <li>Mayor claridad de pensamiento</li>
      </ul>

      <p><strong>Neuroprotección:</strong></p>
      <ul>
        <li>Protección contra enfermedades neurodegenerativas</li>
        <li>Reducción del estrés oxidativo en el cerebro</li>
        <li>Potencial preventivo contra Alzheimer y Parkinson</li>
      </ul>

      <h3>📊 Estudios Clínicos 2024</h3>
      <p>Un estudio publicado en enero de 2024 en el Journal of Medicinal Food demostró que adultos de 50-80 años que consumieron extracto de Melena de León durante 16 semanas mostraron:</p>
      <ul>
        <li>📈 23% de mejora en pruebas cognitivas</li>
        <li>🎯 Mejor desempeño en tareas de memoria</li>
        <li>⚡ Aumento en velocidad de procesamiento mental</li>
      </ul>

      <h3>💊 Cómo Funciona</h3>
      <p>La Melena de León contiene compuestos bioactivos únicos llamados hericenones y erinacinas que:</p>
      <ol>
        <li>Cruzan la barrera hematoencefálica</li>
        <li>Estimulan la síntesis de NGF en el cerebro</li>
        <li>Promueven la mielinización de las neuronas</li>
        <li>Reducen la inflamación neuronal</li>
      </ol>

      <h3>🎯 Dosificación Recomendada</h3>
      <p><strong>Para Beneficios Cognitivos:</strong></p>
      <ul>
        <li>Extracto líquido: 1-2 ml (20-40 gotas) dos veces al día</li>
        <li>Microdosis en cápsulas: 1 cápsula diaria por la mañana</li>
        <li>Duración mínima: 4-8 semanas para resultados óptimos</li>
      </ul>

      <h3>⚠️ Importante</h3>
      <p>Los beneficios son acumulativos. La mayoría de usuarios reportan mejoras notables después de 2-4 semanas de uso consistente. Para mejores resultados, combinar con:</p>
      <ul>
        <li>Sueño adecuado (7-9 horas)</li>
        <li>Ejercicio regular</li>
        <li>Alimentación balanceada</li>
        <li>Estimulación mental continua</li>
      </ul>
    `,
        relatedProducts: ['extract-lions-mane', 'microdose-lions-mane', 'combo-wellness']
    },
    {
        id: 'cordyceps-energia',
        icon: '⚡',
        title: 'Cordyceps Aumenta Energía y Rendimiento Físico',
        category: 'Rendimiento Deportivo',
        tags: ['Rendimiento Deportivo', 'Energía Natural'],
        date: '2024-02-10',
        shortDescription: 'Un estudio de 2024 encontró que Cordyceps incrementa la producción de ATP, mejorando la utilización de oxígeno durante el ejercicio.',
        fullContent: `
      <h3>⚡ El Hongo de los Atletas</h3>
      <p>El Cordyceps (Cordyceps militaris) es conocido como "el hongo de los atletas" por sus extraordinarios efectos en la energía, resistencia y recuperación física. Utilizado tradicionalmente por atletas olímpicos chinos, ahora la ciencia moderna confirma sus increíbles beneficios.</p>

      <h3>🔬 Investigación Científica 2024</h3>
      <p>Un estudio revolucionario publicado en febrero de 2024 en el Journal of Sports Science demostró que Cordyceps:</p>
      <ul>
        <li>📈 Aumenta la producción de ATP (energía celular) en un 28%</li>
        <li>🫁 Mejora la utilización de oxígeno en un 15%</li>
        <li>💪 Reduce el daño muscular post-ejercicio en un 35%</li>
        <li>⏱️ Acelera la recuperación muscular en un 40%</li>
      </ul>

      <h3>💡 Beneficios para el Rendimiento</h3>
      <p><strong>Energía Sostenida:</strong></p>
      <ul>
        <li>Aumento natural de energía sin nerviosismo</li>
        <li>Sin caída de energía (no crash)</li>
        <li>Mayor resistencia durante el día</li>
        <li>Reducción de fatiga crónica</li>
      </ul>

      <p><strong>Rendimiento Deportivo:</strong></p>
      <ul>
        <li>Mayor resistencia cardiovascular</li>
        <li>Mejor capacidad aeróbica (VO2 max)</li>
        <li>Aumento en fuerza muscular</li>
        <li>Mejor tolerancia al ejercicio de alta intensidad</li>
      </ul>

      <p><strong>Recuperación Acelerada:</strong></p>
      <ul>
        <li>Menos dolor muscular post-entrenamiento</li>
        <li>Recuperación más rápida entre sesiones</li>
        <li>Reducción de inflamación muscular</li>
        <li>Mejor calidad de sueño reparador</li>
      </ul>

      <h3>🏃‍♂️ Estudios con Atletas</h3>
      <p>En un estudio con 30 atletas jóvenes (18-25 años) que tomaron Cordyceps durante 6 semanas:</p>
      <ul>
        <li>🏋️ 15% de aumento en tiempo hasta fatiga</li>
        <li>💨 Mejor eficiencia respiratoria</li>
        <li>❤️ Frecuencia cardíaca más estable durante ejercicio</li>
        <li>🎯 Mejor rendimiento en pruebas de resistencia</li>
      </ul>

      <h3>⚙️ Mecanismo de Acción</h3>
      <p>Cordyceps funciona a nivel celular mediante:</p>
      <ol>
        <li><strong>Aumento de ATP:</strong> Mejora la producción de energía en las mitocondrias</li>
        <li><strong>Mejor Oxigenación:</strong> Aumenta la captación y utilización de oxígeno</li>
        <li><strong>Adaptógeno:</strong> Ayuda al cuerpo a adaptarse al estrés físico</li>
        <li><strong>Antioxidante:</strong> Protege células del daño por radicales libres</li>
      </ol>

      <h3>💊 Dosificación para Deportistas</h3>
      <p><strong>Para Rendimiento Deportivo:</strong></p>
      <ul>
        <li>Extracto líquido: 2 ml (40 gotas) 30-60 min antes del ejercicio</li>
        <li>Microdosis: 1 cápsula por la mañana y 1 antes del entrenamiento</li>
        <li>Ciclo: 5 días ON, 2 días OFF para máxima efectividad</li>
      </ul>

      <p><strong>Para Energía Diaria:</strong></p>
      <ul>
        <li>Extracto: 1-2 ml por la mañana con el desayuno</li>
        <li>Microdosis: 1 cápsula diaria</li>
        <li>Uso continuo: Seguro para uso a largo plazo</li>
      </ul>

      <h3>🎯 Ideal Para:</h3>
      <ul>
        <li>✓ Atletas y deportistas de todos los niveles</li>
        <li>✓ Personas con fatiga crónica</li>
        <li>✓ Trabajadores con demandas físicas altas</li>
        <li>✓ Cualquiera que busque más energía natural</li>
      </ul>
    `,
        relatedProducts: ['extract-cordyceps', 'microdose-cordyceps', 'combo-energy']
    },
    {
        id: 'cola-pavo-inmunidad',
        icon: '🛡️',
        title: 'Cola de Pavo Fortalece el Sistema Inmunológico',
        category: 'Inmunología',
        tags: ['Inmunología', 'Investigación Clínica'],
        date: '2024-03-05',
        shortDescription: 'Contiene compuestos PSP y PSK que estimulan la actividad de células inmunes. Aprobado como tratamiento coadyuvante de cáncer en Japón.',
        fullContent: `
      <h3>🛡️ El Guardián de tu Sistema Inmune</h3>
      <p>La Cola de Pavo (Trametes versicolor) es uno de los hongos medicinales más investigados del mundo, con más de 400 estudios científicos que respaldan sus extraordinarios beneficios para el sistema inmunológico. Su uso está oficialmente aprobado en Japón y China como tratamiento complementario en oncología.</p>

      <h3>🔬 Compuestos Activos Únicos</h3>
      <p>La Cola de Pavo contiene dos polisacáridos únicos que la hacen excepcional:</p>
      
      <p><strong>PSK (Polisacárido-K):</strong></p>
      <ul>
        <li>Aprobado en Japón desde 1977 para tratamiento de cáncer</li>
        <li>Estimula células T y células NK (Natural Killer)</li>
        <li>Mejora la respuesta inmune contra tumores</li>
        <li>Reduce efectos secundarios de quimioterapia</li>
      </ul>

      <p><strong>PSP (Polisacárido-Péptido):</strong></p>
      <ul>
        <li>Potente inmunomodulador</li>
        <li>Aumenta producción de interferón</li>
        <li>Mejora función de macrófagos</li>
        <li>Propiedades antioxidantes superiores</li>
      </ul>

      <h3>💡 Beneficios para la Inmunidad</h3>
      <p><strong>Fortalecimiento Inmune:</strong></p>
      <ul>
        <li>Aumento en actividad de células inmunes en un 40%</li>
        <li>Mayor producción de anticuerpos</li>
        <li>Mejor respuesta a infecciones virales y bacterianas</li>
        <li>Reducción en frecuencia de resfriados y gripes</li>
      </ul>

      <p><strong>Apoyo Oncológico:</strong></p>
      <ul>
        <li>Mejora tasas de supervivencia en varios tipos de cáncer</li>
        <li>Reduce náuseas y vómitos de quimioterapia</li>
        <li>Protege células sanas durante tratamiento</li>
        <li>Mejora calidad de vida de pacientes</li>
      </ul>

      <p><strong>Salud Intestinal:</strong></p>
      <ul>
        <li>Efecto prebiótico que nutre microbioma</li>
        <li>Mejora diversidad de bacterias beneficiosas</li>
        <li>Fortalece barrera intestinal</li>
        <li>70% del sistema inmune está en el intestino</li>
      </ul>

      <h3>📊 Evidencia Clínica</h3>
      <p>Estudios en pacientes con cáncer que usaron PSK junto con tratamiento convencional mostraron:</p>
      <ul>
        <li>📈 29% de mejora en tasa de supervivencia a 5 años (cáncer gástrico)</li>
        <li>🎯 35% de mejora en supervivencia (cáncer colorrectal)</li>
        <li>💪 Significativa reducción en recurrencia de tumores</li>
        <li>✨ Mejor calidad de vida durante tratamiento</li>
      </ul>

      <h3>🦠 Protección Antiviral</h3>
      <p>Investigaciones recientes (2024) demuestran que Cola de Pavo:</p>
      <ul>
        <li>Inhibe replicación de virus HPV (Virus del Papiloma Humano)</li>
        <li>Mejora respuesta inmune contra virus respiratorios</li>
        <li>Reduce duración y severidad de infecciones virales</li>
        <li>Potencia efectividad de vacunas</li>
      </ul>

      <h3>💊 Dosificación Recomendada</h3>
      <p><strong>Para Prevención y Salud General:</strong></p>
      <ul>
        <li>Extracto: 1-2 ml dos veces al día con comidas</li>
        <li>Microdosis: 1 cápsula diaria</li>
        <li>Uso continuo seguro a largo plazo</li>
      </ul>

      <p><strong>Para Apoyo Inmune Intensivo:</strong></p>
      <ul>
        <li>Extracto: 2 ml tres veces al día</li>
        <li>Microdosis: 1 cápsula dos veces al día</li>
        <li>Duración: Mínimo 8-12 semanas</li>
      </ul>

      <h3>🎯 Ideal Para:</h3>
      <ul>
        <li>✓ Personas con sistema inmune debilitado</li>
        <li>✓ Prevención durante temporada de gripes</li>
        <li>✓ Apoyo durante tratamientos oncológicos (consultar médico)</li>
        <li>✓ Recuperación post-enfermedad</li>
        <li>✓ Personas con infecciones recurrentes</li>
      </ul>

      <h3>⚠️ Nota Importante</h3>
      <p>Si estás bajo tratamiento médico, especialmente inmunosupresores o quimioterapia, consulta con tu oncólogo antes de usar Cola de Pavo. En Japón y China, se prescribe bajo supervisión médica como parte del protocolo de tratamiento.</p>
    `,
        relatedProducts: ['extract-turkey-tail', 'microdose-turkey-tail', 'combo-immunity']
    },
    {
        id: 'reduccion-estres',
        icon: '😌',
        title: 'Hongos Medicinales Reducen Estrés y Ansiedad',
        category: 'Salud Mental',
        tags: ['Salud Mental', 'Adaptógenos'],
        date: '2024-01-20',
        shortDescription: 'La Melena de León exhibe propiedades antidepresivas y ansiolíticas al combatir el estrés oxidativo. Sus propiedades adaptogénicas ayudan al cuerpo a manejar el estrés.',
        fullContent: `
      <h3>😌 Calma Natural para la Mente Moderna</h3>
      <p>En un mundo cada vez más estresante, los hongos medicinales ofrecen una solución natural y efectiva para manejar el estrés, la ansiedad y mejorar el bienestar emocional. Sin los efectos secundarios de medicamentos sintéticos, estos hongos trabajan con tu cuerpo para restaurar el equilibrio mental.</p>

      <h3>🔬 Ciencia del Estrés y Hongos Adaptógenos</h3>
      <p>Los hongos medicinales son adaptógenos naturales, lo que significa que ayudan al cuerpo a:</p>
      <ul>
        <li>Adaptarse mejor a situaciones estresantes</li>
        <li>Regular la respuesta al cortisol (hormona del estrés)</li>
        <li>Proteger el sistema nervioso del daño por estrés</li>
        <li>Mantener homeostasis (equilibrio interno)</li>
      </ul>

      <h3>🧠 Melena de León: El Ansiolítico Natural</h3>
      <p><strong>Estudios Recientes (2023-2024):</strong></p>
      <p>Un estudio publicado en 2023 con 77 adultos sanos mostró que después de 8 semanas de suplementación con Melena de León:</p>
      <ul>
        <li>📉 42% de reducción en síntomas de ansiedad</li>
        <li>😊 38% de mejora en síntomas depresivos</li>
        <li>💤 Mejor calidad de sueño</li>
        <li>🎯 Mayor sensación de bienestar general</li>
      </ul>

      <p><strong>Mecanismo de Acción:</strong></p>
      <ul>
        <li>Reduce inflamación en el cerebro (neuroinflamación)</li>
        <li>Combate estrés oxidativo en neuronas</li>
        <li>Estimula producción de NGF (Factor de Crecimiento Nervioso)</li>
        <li>Regula neurotransmisores (serotonina, dopamina)</li>
      </ul>

      <h3>🍄 Reishi: El Hongo de la Tranquilidad</h3>
      <p><strong>Beneficios para el Estrés:</strong></p>
      <ul>
        <li>Reduce niveles de cortisol en sangre</li>
        <li>Promueve relajación sin somnolencia</li>
        <li>Mejora calidad de sueño profundo</li>
        <li>Calma el sistema nervioso</li>
      </ul>

      <p><strong>Evidencia Científica:</strong></p>
      <p>Estudios demuestran que Reishi (Ganoderma):</p>
      <ul>
        <li>Reduce fatiga mental y física en un 35%</li>
        <li>Mejora estado de ánimo en personas con estrés crónico</li>
        <li>Disminuye irritabilidad y tensión</li>
        <li>Aumenta sensación de paz interior</li>
      </ul>

      <h3>💡 Beneficios Combinados</h3>
      <p><strong>Salud Mental Integral:</strong></p>
      <ul>
        <li>Reducción de ansiedad generalizada</li>
        <li>Menor frecuencia de ataques de pánico</li>
        <li>Mejora en síntomas de depresión leve a moderada</li>
        <li>Mayor resiliencia emocional</li>
      </ul>

      <p><strong>Función Cognitiva:</strong></p>
      <ul>
        <li>Mejor concentración bajo presión</li>
        <li>Reducción de "niebla mental"</li>
        <li>Toma de decisiones más clara</li>
        <li>Mayor creatividad y pensamiento flexible</li>
      </ul>

      <p><strong>Bienestar Físico:</strong></p>
      <ul>
        <li>Reducción de tensión muscular</li>
        <li>Mejor digestión (el estrés afecta el intestino)</li>
        <li>Sistema inmune más fuerte</li>
        <li>Mejor calidad de sueño</li>
      </ul>

      <h3>📊 Comparación con Tratamientos Convencionales</h3>
      <p><strong>Ventajas de Hongos Medicinales:</strong></p>
      <ul>
        <li>✓ Sin efectos secundarios significativos</li>
        <li>✓ No crean dependencia</li>
        <li>✓ No causan somnolencia durante el día</li>
        <li>✓ Beneficios adicionales para salud general</li>
        <li>✓ Seguros para uso a largo plazo</li>
      </ul>

      <h3>💊 Protocolo Anti-Estrés</h3>
      <p><strong>Mañana:</strong></p>
      <ul>
        <li>Melena de León: 1-2 ml extracto o 1 cápsula</li>
        <li>Para claridad mental y enfoque</li>
      </ul>

      <p><strong>Tarde:</strong></p>
      <ul>
        <li>Cordyceps: 1 ml extracto (si necesitas energía)</li>
        <li>O Reishi: 1 ml extracto (si necesitas calma)</li>
      </ul>

      <p><strong>Noche:</strong></p>
      <ul>
        <li>Reishi: 2 ml extracto 1-2 horas antes de dormir</li>
        <li>Para relajación y mejor sueño</li>
      </ul>

      <h3>🎯 Ideal Para:</h3>
      <ul>
        <li>✓ Personas con estrés laboral crónico</li>
        <li>✓ Ansiedad generalizada o social</li>
        <li>✓ Insomnio relacionado con estrés</li>
        <li>✓ Burnout o agotamiento mental</li>
        <li>✓ Estudiantes en épocas de exámenes</li>
      </ul>

      <h3>🌟 Consejos Adicionales</h3>
      <p>Para máximos beneficios, combinar con:</p>
      <ul>
        <li>Meditación o mindfulness (10-15 min diarios)</li>
        <li>Ejercicio regular (30 min, 3-5 veces/semana)</li>
        <li>Sueño adecuado (7-9 horas)</li>
        <li>Reducción de cafeína y azúcar</li>
        <li>Tiempo en naturaleza</li>
      </ul>
    `,
        relatedProducts: ['extract-lions-mane', 'extract-reishi', 'microdose-lions-mane', 'combo-wellness']
    },
    {
        id: 'salud-digestiva',
        icon: '🌱',
        title: 'Mejoran la Salud Digestiva Naturalmente',
        category: 'Microbioma',
        tags: ['Microbioma', 'Salud Digestiva'],
        date: '2024-02-15',
        shortDescription: 'Los hongos promueven el crecimiento de bacterias intestinales beneficiosas con efectos prebióticos. Cola de Pavo y Melena de León ayudan a mantener un microbioma intestinal equilibrado.',
        fullContent: `
      <h3>🌱 El Intestino: Tu Segundo Cerebro</h3>
      <p>El sistema digestivo alberga el 70% de tu sistema inmune y produce el 90% de la serotonina (hormona de la felicidad). Los hongos medicinales son aliados poderosos para mantener un intestino saludable y un microbioma equilibrado.</p>

      <h3>🔬 Hongos como Prebióticos Naturales</h3>
      <p>Los hongos medicinales contienen polisacáridos únicos que actúan como prebióticos de alta calidad:</p>
      
      <p><strong>Beta-Glucanos:</strong></p>
      <ul>
        <li>Alimentan bacterias beneficiosas (Lactobacillus, Bifidobacterium)</li>
        <li>Mejoran diversidad del microbioma</li>
        <li>Fortalecen la barrera intestinal</li>
        <li>Reducen permeabilidad intestinal ("intestino permeable")</li>
      </ul>

      <p><strong>Polisacáridos Complejos:</strong></p>
      <ul>
        <li>Estimulan producción de ácidos grasos de cadena corta (SCFA)</li>
        <li>Reducen inflamación intestinal</li>
        <li>Mejoran absorción de nutrientes</li>
        <li>Regulan motilidad intestinal</li>
      </ul>

      <h3>🍄 Cola de Pavo: Guardián del Microbioma</h3>
      <p><strong>Beneficios Específicos:</strong></p>
      <ul>
        <li>📈 Aumenta Lactobacillus en un 45%</li>
        <li>🦠 Aumenta Bifidobacterium en un 38%</li>
        <li>📉 Reduce bacterias patógenas en un 30%</li>
        <li>✨ Mejora diversidad microbiana general</li>
      </ul>

      <p><strong>Estudios Recientes (2024):</strong></p>
      <p>Investigación publicada en Gut Microbiome Journal demostró que Cola de Pavo:</p>
      <ul>
        <li>Restaura microbioma después de antibióticos</li>
        <li>Reduce síntomas de síndrome de intestino irritable (SII)</li>
        <li>Mejora digestión y absorción de nutrientes</li>
        <li>Disminuye inflamación intestinal crónica</li>
      </ul>

      <h3>🧠 Melena de León: Conexión Intestino-Cerebro</h3>
      <p><strong>Eje Intestino-Cerebro:</strong></p>
      <ul>
        <li>Protege revestimiento del estómago</li>
        <li>Reduce úlceras gástricas</li>
        <li>Mejora producción de mucosa protectora</li>
        <li>Regula motilidad intestinal</li>
      </ul>

      <p><strong>Beneficios Digestivos:</strong></p>
      <ul>
        <li>Alivia gastritis y reflujo</li>
        <li>Reduce inflamación intestinal</li>
        <li>Mejora síntomas de colitis</li>
        <li>Protege contra H. pylori</li>
      </ul>

      <h3>💡 Beneficios para Condiciones Digestivas</h3>
      <p><strong>Síndrome de Intestino Irritable (SII):</strong></p>
      <ul>
        <li>Reducción de dolor abdominal en un 40%</li>
        <li>Menos episodios de diarrea/estreñimiento</li>
        <li>Disminución de hinchazón y gases</li>
        <li>Mejor calidad de vida general</li>
      </ul>

      <p><strong>Enfermedad Inflamatoria Intestinal (EII):</strong></p>
      <ul>
        <li>Reducción de marcadores inflamatorios</li>
        <li>Menos brotes y recaídas</li>
        <li>Mejor cicatrización de mucosa intestinal</li>
        <li>Apoyo complementario a tratamiento médico</li>
      </ul>

      <p><strong>Problemas Digestivos Comunes:</strong></p>
      <ul>
        <li>Acidez y reflujo</li>
        <li>Digestión lenta</li>
        <li>Hinchazón después de comer</li>
        <li>Intolerancias alimentarias</li>
      </ul>

      <h3>🦠 Restauración Post-Antibióticos</h3>
      <p>Los antibióticos eliminan bacterias buenas y malas. Los hongos medicinales ayudan a:</p>
      <ul>
        <li>Repoblar microbioma con bacterias beneficiosas</li>
        <li>Restaurar diversidad microbiana en 4-6 semanas</li>
        <li>Prevenir infecciones oportunistas (Candida)</li>
        <li>Reducir efectos secundarios digestivos de antibióticos</li>
      </ul>

      <h3>💊 Protocolo para Salud Digestiva</h3>
      <p><strong>Mantenimiento Diario:</strong></p>
      <ul>
        <li>Cola de Pavo: 1-2 ml extracto con comidas</li>
        <li>Melena de León: 1 ml extracto antes de comidas</li>
        <li>Duración: Uso continuo seguro</li>
      </ul>

      <p><strong>Problemas Digestivos Activos:</strong></p>
      <ul>
        <li>Cola de Pavo: 2 ml tres veces al día</li>
        <li>Melena de León: 2 ml dos veces al día</li>
        <li>Duración: 8-12 semanas mínimo</li>
      </ul>

      <p><strong>Post-Antibióticos:</strong></p>
      <ul>
        <li>Comenzar inmediatamente después de terminar antibióticos</li>
        <li>Cola de Pavo: 2 ml dos veces al día</li>
        <li>Duración: 4-6 semanas</li>
      </ul>

      <h3>🎯 Ideal Para:</h3>
      <ul>
        <li>✓ Personas con problemas digestivos crónicos</li>
        <li>✓ Después de tratamiento con antibióticos</li>
        <li>✓ SII, EII, gastritis</li>
        <li>✓ Mejorar salud inmune (70% está en intestino)</li>
        <li>✓ Optimizar absorción de nutrientes</li>
      </ul>

      <h3>🌟 Consejos Adicionales</h3>
      <p>Para máximos beneficios, combinar con:</p>
      <ul>
        <li>Dieta rica en fibra (frutas, verduras, granos integrales)</li>
        <li>Alimentos fermentados (yogurt, kéfir, chucrut)</li>
        <li>Hidratación adecuada (2-3 litros agua/día)</li>
        <li>Reducir azúcar y alimentos procesados</li>
        <li>Manejo del estrés (afecta directamente el intestino)</li>
      </ul>
    `,
        relatedProducts: ['extract-turkey-tail', 'extract-lions-mane', 'microdose-turkey-tail', 'combo-immunity']
    },
    {
        id: 'antioxidantes-antienvejecimiento',
        icon: '✨',
        title: 'Poderosos Antioxidantes y Propiedades Anti-Envejecimiento',
        category: 'Antioxidantes',
        tags: ['Antioxidantes', 'Anti-Envejecimiento'],
        date: '2024-03-01',
        shortDescription: 'Los hongos medicinales contienen altos niveles de antioxidantes como ergotioneína y selenio, que combaten el daño celular causado por radicales libres.',
        fullContent: `
      <h3>✨ La Fuente de la Juventud Natural</h3>
      <p>El envejecimiento es inevitable, pero el envejecimiento prematuro no lo es. Los hongos medicinales contienen algunos de los antioxidantes más potentes de la naturaleza, capaces de proteger tus células, ralentizar el envejecimiento y promover longevidad saludable.</p>

      <h3>🔬 Antioxidantes Únicos en Hongos</h3>
      <p><strong>Ergotioneína: El "Antioxidante Maestro"</strong></p>
      <ul>
        <li>Único en hongos (no se encuentra en plantas)</li>
        <li>Se acumula en tejidos con alto estrés oxidativo</li>
        <li>Protege mitocondrias (centrales de energía celular)</li>
        <li>Vida media de 30 días en el cuerpo (muy duradera)</li>
        <li>Cruza barrera hematoencefálica (protege cerebro)</li>
      </ul>

      <p><strong>Selenio Orgánico:</strong></p>
      <ul>
        <li>Cofactor de enzimas antioxidantes (glutatión peroxidasa)</li>
        <li>Protege ADN del daño oxidativo</li>
        <li>Apoya función tiroidea</li>
        <li>Fortalece sistema inmune</li>
      </ul>

      <p><strong>Otros Antioxidantes Potentes:</strong></p>
      <ul>
        <li>Fenoles y flavonoides</li>
        <li>Superóxido dismutasa (SOD)</li>
        <li>Catalasa</li>
        <li>Vitamina D (especialmente en hongos expuestos a UV)</li>
      </ul>

      <h3>💡 Beneficios Anti-Envejecimiento</h3>
      <p><strong>A Nivel Celular:</strong></p>
      <ul>
        <li>📉 Reducción de daño al ADN en un 35%</li>
        <li>🔋 Protección de mitocondrias (energía celular)</li>
        <li>🛡️ Prevención de mutaciones celulares</li>
        <li>⚡ Mejora en reparación celular</li>
      </ul>

      <p><strong>Piel y Apariencia:</strong></p>
      <ul>
        <li>Reducción de arrugas y líneas finas</li>
        <li>Mayor elasticidad y firmeza</li>
        <li>Protección contra daño UV</li>
        <li>Mejor hidratación y luminosidad</li>
        <li>Reducción de manchas de edad</li>
      </ul>

      <p><strong>Salud Cerebral:</strong></p>
      <ul>
        <li>Protección contra deterioro cognitivo</li>
        <li>Reducción de riesgo de Alzheimer y Parkinson</li>
        <li>Mejor memoria a largo plazo</li>
        <li>Preservación de función ejecutiva</li>
      </ul>

      <h3>📊 Estudios sobre Longevidad</h3>
      <p><strong>Investigación 2024:</strong></p>
      <p>Estudios publicados en Aging Cell Journal demostraron que personas que consumen hongos medicinales regularmente:</p>
      <ul>
        <li>🧬 Tienen telómeros más largos (marcador de longevidad)</li>
        <li>📉 50% menos marcadores de estrés oxidativo</li>
        <li>💪 Mejor función física en edad avanzada</li>
        <li>🧠 Menor incidencia de demencia</li>
      </ul>

      <p><strong>Estudio de Población:</strong></p>
      <p>Análisis de 24,000 personas durante 18 años mostró que quienes consumen hongos 2+ veces por semana tienen:</p>
      <ul>
        <li>16% menos riesgo de mortalidad general</li>
        <li>35% menos riesgo de enfermedades neurodegenerativas</li>
        <li>Mejor salud cardiovascular</li>
        <li>Menor incidencia de cáncer</li>
      </ul>

      <h3>🍄 Hongos con Mayor Poder Antioxidante</h3>
      <p><strong>1. Reishi (Ganoderma):</strong></p>
      <ul>
        <li>Más de 400 compuestos bioactivos</li>
        <li>Triterpenos anti-inflamatorios</li>
        <li>Protección cardiovascular</li>
        <li>Longevidad celular</li>
      </ul>

      <p><strong>2. Cola de Pavo:</strong></p>
      <ul>
        <li>Alto contenido de fenoles</li>
        <li>Protección contra cáncer</li>
        <li>Regeneración celular</li>
      </ul>

      <p><strong>3. Melena de León:</strong></p>
      <ul>
        <li>Neuroprotección específica</li>
        <li>Prevención de deterioro cognitivo</li>
        <li>Regeneración nerviosa</li>
      </ul>

      <p><strong>4. Cordyceps:</strong></p>
      <ul>
        <li>Protección mitocondrial</li>
        <li>Energía celular sostenida</li>
        <li>Anti-fatiga</li>
      </ul>

      <h3>⚡ Combate al Estrés Oxidativo</h3>
      <p><strong>¿Qué es el Estrés Oxidativo?</strong></p>
      <p>Desequilibrio entre radicales libres (moléculas dañinas) y antioxidantes. Causas principales:</p>
      <ul>
        <li>Contaminación ambiental</li>
        <li>Radiación UV</li>
        <li>Dieta pobre</li>
        <li>Estrés crónico</li>
        <li>Tabaco y alcohol</li>
        <li>Ejercicio excesivo</li>
      </ul>

      <p><strong>Consecuencias del Estrés Oxidativo:</strong></p>
      <ul>
        <li>Envejecimiento prematuro</li>
        <li>Enfermedades crónicas</li>
        <li>Deterioro cognitivo</li>
        <li>Inflamación crónica</li>
        <li>Cáncer</li>
      </ul>

      <h3>💊 Protocolo Anti-Envejecimiento</h3>
      <p><strong>Prevención (20-40 años):</strong></p>
      <ul>
        <li>Mezcla de extractos: 1 ml diario</li>
        <li>Rotar entre diferentes hongos semanalmente</li>
        <li>Enfoque en prevención</li>
      </ul>

      <p><strong>Mantenimiento (40-60 años):</strong></p>
      <ul>
        <li>Reishi: 1-2 ml diario</li>
        <li>Melena de León: 1 ml diario</li>
        <li>Cola de Pavo: 1 ml diario</li>
        <li>Uso continuo</li>
      </ul>

      <p><strong>Intensivo (60+ años):</strong></p>
      <ul>
        <li>Combinación de 2-3 hongos</li>
        <li>2 ml de cada, dos veces al día</li>
        <li>Enfoque en neuroprotección y longevidad</li>
      </ul>

      <h3>🎯 Ideal Para:</h3>
      <ul>
        <li>✓ Prevención de envejecimiento prematuro</li>
        <li>✓ Personas expuestas a contaminación</li>
        <li>✓ Protección contra enfermedades crónicas</li>
        <li>✓ Mejorar vitalidad y energía</li>
        <li>✓ Preservar función cognitiva</li>
        <li>✓ Optimizar longevidad saludable</li>
      </ul>

      <h3>🌟 Estilo de Vida Anti-Envejecimiento</h3>
      <p>Para máximos beneficios, combinar hongos con:</p>
      <ul>
        <li>Dieta rica en antioxidantes (frutas, verduras coloridas)</li>
        <li>Ejercicio regular (150 min/semana)</li>
        <li>Sueño de calidad (7-9 horas)</li>
        <li>Manejo del estrés (meditación, yoga)</li>
        <li>Protección solar</li>
        <li>Hidratación adecuada</li>
        <li>Evitar tabaco y alcohol excesivo</li>
      </ul>

      <h3>📈 Resultados Esperados</h3>
      <p><strong>Corto Plazo (2-4 semanas):</strong></p>
      <ul>
        <li>Más energía y vitalidad</li>
        <li>Mejor calidad de sueño</li>
        <li>Piel más radiante</li>
      </ul>

      <p><strong>Mediano Plazo (2-3 meses):</strong></p>
      <ul>
        <li>Reducción visible de arrugas</li>
        <li>Mejor función cognitiva</li>
        <li>Mayor resistencia física</li>
      </ul>

      <p><strong>Largo Plazo (6+ meses):</strong></p>
      <ul>
        <li>Protección celular sostenida</li>
        <li>Menor riesgo de enfermedades</li>
        <li>Envejecimiento más lento y saludable</li>
      </ul>
    `,
        relatedProducts: ['extract-reishi', 'extract-lions-mane', 'extract-turkey-tail', 'extract-cordyceps']
    }
];

# ==========================================
# Stage 1: Build the application
# ==========================================
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app

# Copy Maven wrapper configuration and the pom.xml first
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Give execute permission to the Maven wrapper
RUN chmod +x mvnw

# Download dependencies (this layer is cached unless pom.xml changes)
RUN ./mvnw dependency:go-offline -B

# Copy the actual source code
COPY src ./src

# Build the application package (skipping tests for speed)
RUN ./mvnw clean package -DskipTests

# ==========================================
# Stage 2: Minimal Runtime Environment
# ==========================================
FROM eclipse-temurin:21-jre AS runner
WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Render will override this EXPOSE instruction, but it's great for local documentation
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
import { useOnboardingStorage } from './useOnboardingStorage';

export function useDashboardData() {
  const { getFormData } = useOnboardingStorage();

  const getClusterConfig = () => {
    const data = getFormData();
    if (!data) return null;

    return {
      name: data.clusterName,
      namespace: data.namespace,
      version: data.version,
      registry: data.registry,
      registryPrefix: data.registryPrefix,
    };
  };

  const getPostgresConfig = () => {
    const data = getFormData();
    if (!data) return null;

    return {
      host: data.host,
      port: data.port,
      database: data.database,
      username: data.username,
      password: data.password,
    };
  };

  const getMinioConfig = () => {
    const data = getFormData();
    if (!data) return null;

    return {
      endpoint: data.minioEndpoint,
      accessKey: data.minioAccessKey,
      secretKey: data.minioSecretKey,
      bucket: data.minioBucket,
      region: data.minioRegion,
      secure: data.minioSecure,
    };
  };

  const getSparkConfig = () => {
    const data = getFormData();
    if (!data) return null;

    return {
      master: data.sparkMaster,
      executorInstances: data.sparkExecutorInstances,
      executorCores: data.sparkExecutorCores,
      executorMemory: data.sparkExecutorMemory,
      driverMemory: data.sparkDriverMemory,
      driverCores: data.sparkDriverCores,
      pythonVersion: data.sparkPythonVersion,
      configureYarn: data.sparkConfigureYarn,
    };
  };

  const getJupyterConfig = () => {
    const data = getFormData();
    if (!data) return null;

    return {
      port: data.jupyterPort,
      token: data.jupyterToken,
      baseUrl: data.jupyterBaseUrl,
      workspacePath: data.jupyterWorkspacePath,
      defaultKernel: data.jupyterDefaultKernel,
      enableAutosave: data.jupyterEnableAutosave,
      enableCollaboration: data.jupyterEnableCollaboration,
      maxUploadSize: data.jupyterMaxUploadSize,
    };
  };

  return {
    getClusterConfig,
    getPostgresConfig,
    getMinioConfig,
    getSparkConfig,
    getJupyterConfig,
  };
} 
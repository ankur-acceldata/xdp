import { useOnboardingStorage } from './useOnboardingStorage';
import { useCallback } from 'react';

export function useDashboardData() {
  const { getFormData } = useOnboardingStorage();

  const getClusterConfig = useCallback(() => {
    const data = getFormData();
    if (!data) return null;

    return {
      name: data.clusterName,
      namespace: data.namespace,
      version: data.version,
      registry: data.registry,
      registryPrefix: data.registryPrefix,
    };
  }, [getFormData]);

  const getPostgresConfig = useCallback(() => {
    const data = getFormData();
    if (!data) return null;

    return {
      host: data.host,
      port: data.port,
      database: data.database,
      username: data.username,
      password: data.password,
    };
  }, [getFormData]);

  const getMinioConfig = useCallback(() => {
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
  }, [getFormData]);

  const getSparkConfig = useCallback(() => {
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
  }, [getFormData]);

  const getJupyterConfig = useCallback(() => {
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
  }, [getFormData]);

  return {
    getClusterConfig,
    getPostgresConfig,
    getMinioConfig,
    getSparkConfig,
    getJupyterConfig,
  };
} 
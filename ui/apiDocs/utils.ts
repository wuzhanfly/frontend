import type { SwaggerRequest } from './types';

import config from 'configs/app';
import type { ApiPropsBase } from 'configs/app/apis';

const feature = config.features.apiDocs;

const microserviceRequestInterceptorFactory = (api: ApiPropsBase) => (req: SwaggerRequest) => {
  try {
    const url = new URL(req.url);
    if (api?.basePath && !url.pathname.includes(api.basePath)) {
      url.pathname = (api?.basePath ?? '') + url.pathname;
    }
    req.url = url.toString();
  } catch (error) {}
  return req;
};

const getMicroserviceSwaggerUrl = (api: ApiPropsBase) => `${ api.endpoint }${ api.basePath ?? '' }/api/v1/docs/swagger.yaml`;

export function getRestApiSections(t: (key: string) => string) {
  return [
    feature.isEnabled && {
      id: 'blockscout-core-api',
      title: t('common.common.blockscout_core_api'),
      swagger: {
        url: feature.coreApiSwaggerUrl,
        requestInterceptor: (req: SwaggerRequest) => {
          const DEFAULT_SERVER = 'blockscout.com/poa/core';
          const DEFAULT_SERVER_NEW = 'eth.blockscout.com';

          if (!req.loadSpec) {
            const newUrl = new URL(
              req.url
                .replace(DEFAULT_SERVER, config.apis.general.host)
                .replace(DEFAULT_SERVER_NEW, config.apis.general.host),
            );

            newUrl.protocol = config.apis.general.protocol + ':';

            if (config.apis.general.port) {
              newUrl.port = config.apis.general.port;
            }

            req.url = newUrl.toString();
          }
          return req;
        },
      },
    },
    config.apis.stats && {
      id: 'stats-api',
      title: t('common.common.stats_api'),
      swagger: {
        url: getMicroserviceSwaggerUrl(config.apis.stats),
        requestInterceptor: microserviceRequestInterceptorFactory(config.apis.stats),
      },
    },
    config.apis.bens && {
      id: 'bens-api',
      title: t('common.common.name_service_api'),
      swagger: {
        url: getMicroserviceSwaggerUrl(config.apis.bens),
        requestInterceptor: microserviceRequestInterceptorFactory(config.apis.bens),
      },
    },
    config.apis.userOps && {
      id: 'user-ops-api',
      title: t('common.common.user_ops_indexer_api'),
      swagger: {
        url: getMicroserviceSwaggerUrl(config.apis.userOps),
        requestInterceptor: microserviceRequestInterceptorFactory(config.apis.userOps),
      },
    },
    config.apis.tac && {
      id: 'tac-api',
      title: t('common.common.tac_operation_lifecycle_api'),
      swagger: {
        url: getMicroserviceSwaggerUrl(config.apis.tac),
        requestInterceptor: microserviceRequestInterceptorFactory(config.apis.tac),
      },
    },
  ].filter(Boolean);
}

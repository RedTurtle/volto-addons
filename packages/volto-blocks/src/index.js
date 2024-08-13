import { blocks } from './config/blocks';

const applyConfig = (config) => {
  config.blocks.blocksConfig = { ...config.blocks.blocksConfig, ...blocks };

  return config;
};

export default applyConfig;

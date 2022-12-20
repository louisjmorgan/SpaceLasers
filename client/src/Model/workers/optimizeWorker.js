import optimizeSpacePower from '../optimizer';

onmessage = async function (event) {
  const { req } = event.data;

  const result = await optimizeSpacePower(req);

  postMessage({
    done: 'true',
    result,
  });
};

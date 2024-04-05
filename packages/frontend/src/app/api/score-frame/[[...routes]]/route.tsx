/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import { getUser } from '@/lib/neynar';
import { getUserScore } from '@/lib/score';
import { Button, Frog } from 'frog';
import { handle } from 'frog/next';

const TEXT_COLOR = '#FDA174';
const CONTAINER_STYLE = {
  color: TEXT_COLOR,
  backgroundColor: '#1E1E1E',
  display: 'flex',
  flexDirection: 'column' as any,
  width: '100%',
  paddingLeft: 60,
  paddingRight: 60,
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 40,
  borderColor: TEXT_COLOR,
};

const { RENDER } = process.env;
const IS_RENDER = RENDER === 'true';

const app = new Frog({
  basePath: '/api/score-frame',
  browserLocation: '/:path',
  // Supply a Hub API URL to enable frame verification.
  hubApiUrl: 'https://api.hub.wevm.dev',
  verify: IS_RENDER,
  secret: process.env.FROG_SECRET || '',
  dev: {
    enabled: !IS_RENDER,
  },
});

app.frame('/', c => {
  const { buttonValue, frameData } = c;

  if (buttonValue === 'check' && frameData) {
    return checkScoreFrame(c, frameData.fid);
  }

  return c.res({
    action: '/',
    image: (
      <div
        style={{
          ...CONTAINER_STYLE,
          fontSize: 60,
        }}
      >
        check your creddd score
      </div>
    ),
    intents: [<Button value="check">check</Button>],
  });
});

app.frame('/user/:fid', c => {
  const { fid } = c.req.param();

  return checkScoreFrame(c, parseInt(fid));
});

const checkScoreFrame = async (c: any, fid: number) => {
  const user = await getUser(fid);
  const score = await getUserScore(fid);

  if (!user) {
    return c.res({
      action: '/',
      image: (
        <div
          style={{
            ...CONTAINER_STYLE,
            fontSize: 60,
          }}
        >
          User not found
        </div>
      ),
      intents: [<Button value="">Reload</Button>],
    });
  }

  const shareLink = `https://warpcast.com/~/compose?text=Check your creddd score ${process.env.RENDER_EXTERNAL_URL}/api/score-frame/user/${fid}`;

  return c.res({
    action: '/',
    image: (
      <div
        style={{
          ...CONTAINER_STYLE,
          fontSize: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <img
            src={user.pfp_url}
            alt="profile image"
            style={{
              borderRadius: '50%',
              width: 100,
              height: 100,
              objectFit: 'cover',
            }}
          ></img>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
              fontSize: 40,
            }}
          >
            <span>{user.display_name}</span>
            <span
              style={{
                opacity: 0.6,
              }}
            >
              CREDDD SCORE: <span>{score}</span>
            </span>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={shareLink}>Share</Button.Link>,
      <Button.Link href="https://creddd.xyz/search">Add creddd</Button.Link>,
    ],
  });
};

export const GET = handle(app);
export const POST = handle(app);

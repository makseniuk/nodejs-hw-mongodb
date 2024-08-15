import { createUser } from '../services/auth.js';
import createHttpError from 'http-errors';
import { authenticateUser } from '../services/auth.js';
import { refreshUserSession } from '../services/auth.js';
import { endUserSession } from '../services/auth.js';



export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await createUser({ name, email, password });

    if (!existingUser) {
      throw createHttpError(409, 'Email in use');
    }

    res.status(201).json({
      status: 'success',
      message: 'Successfully registered a user!',
      data: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await authenticateUser({ email, password });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in an user!',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshSession = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createHttpError(401, 'Refresh token not provided');
    }

    const { accessToken, newRefreshToken } = await refreshUserSession(refreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully refreshed a session!',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createHttpError(400, 'Refresh token not provided');
    }

    await endUserSession(refreshToken);

    res.clearCookie('refreshToken');
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

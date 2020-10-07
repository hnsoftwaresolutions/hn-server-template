'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinonChai = require('sinon-chai');

describe(
    'src',
    function () {
        describe(
            'instances',
            function () {
                describe(
                    'express-rate-limit-instance',
                    function () {
                        let expect;
                        let expressRateLimitSpy;

                        before(function () {
                            expect = chai.expect;
                            chai.use(sinonChai);
                        });

                        beforeEach(function () {
                            expressRateLimitSpy = sinon.spy();

                            proxyquire(
                                '../../../../src/instances/express-rate-limit-instance',
                                {
                                    'express-rate-limit': expressRateLimitSpy
                                }
                            );
                        });

                        afterEach(function () {
                            sinon.restore();
                            sinon.reset();
                        });

                        it(
                            'should call expressRateLimit with correct values if there is no '
                            + 'environment variable',
                            function () {
                                const MILLISECONDS = 1000;
                                const SECONDS = 60;
                                const MINUTES = 15;
                                const REQUEST_COUNT = 9999;

                                expect(expressRateLimitSpy)
                                    .to
                                    .have
                                    .been
                                    .calledOnceWithExactly({
                                        windowMs: MINUTES * SECONDS * MILLISECONDS,
                                        max: REQUEST_COUNT
                                    });
                            }
                        );

                        it(
                            'should call expressRateLimit with environment variable values if there'
                            + ' are',
                            function () {
                                const oldEnvironmentRateLimitResetTimeMs
                                    = process.env.RATE_LIMIT_RESET_TIME_MS;
                                const oldRateLimitRequestCount
                                    = process.env.RATE_LIMIT_REQUEST_COUNT;

                                process.env.RATE_LIMIT_RESET_TIME_MS = 1234;
                                process.env.RATE_LIMIT_REQUEST_COUNT = 4321;

                                sinon.resetHistory();

                                proxyquire(
                                    '../../../../src/instances/express-rate-limit-instance',
                                    {
                                        'express-rate-limit': expressRateLimitSpy
                                    }
                                );

                                expect(expressRateLimitSpy)
                                    .to
                                    .have
                                    .been
                                    .calledOnceWithExactly({
                                        windowMs: process.env.RATE_LIMIT_RESET_TIME_MS,
                                        max: process.env.RATE_LIMIT_REQUEST_COUNT
                                    });

                                process.env.RATE_LIMIT_RESET_TIME_MS
                                    = oldEnvironmentRateLimitResetTimeMs;
                                process.env.RATE_LIMIT_REQUEST_COUNT = oldRateLimitRequestCount;
                            }
                        );
                    }
                );
            }
        );
    }
);

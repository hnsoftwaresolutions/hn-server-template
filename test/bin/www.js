'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinonChai = require('sinon-chai');

describe(
    'bin',
    function () {
        describe(
            'www',
            function () {
                let expect;
                let appSpy;
                let createServerStub;
                let listenSpy;

                before(function () {
                    expect = chai.expect;
                    chai.use(sinonChai);
                });

                beforeEach(function () {
                    appSpy = sinon.spy();
                    listenSpy = sinon.spy();
                    createServerStub = sinon.stub()
                        .returns({
                            listen: listenSpy
                        });

                    proxyquire(
                        '../../bin/www.js',
                        {
                            http: {
                                createServer: createServerStub
                            },
                            '../src/app': appSpy
                        }
                    );
                });

                afterEach(function () {
                    sinon.resetHistory();
                    sinon.restore();
                });

                it(
                    'should call http.createServer with express app',
                    function () {
                        expect(createServerStub)
                            .to
                            .have
                            .been
                            .calledOnceWithExactly(appSpy);
                    }
                );

                it(
                    'should call createserver(app).listen with 3206 if there '
                    + 'is no environment variable',
                    function () {
                        const PORT = 3206;

                        expect(listenSpy)
                            .to
                            .have
                            .been
                            .calledOnceWithExactly(PORT);
                    }
                );

                it(
                    'should call createserver(app).listen with environment port'
                    + ' if there is one',
                    function () {
                        const oldEnvironmentPort = process.env.PORT;

                        process.env.PORT = 1234;
                        sinon.resetHistory();

                        proxyquire(
                            '../../bin/www.js',
                            {
                                http: {
                                    createServer: createServerStub
                                },
                                '../src/app': appSpy
                            }
                        );

                        expect(listenSpy)
                            .to
                            .have
                            .been
                            .calledOnceWithExactly(process.env.PORT);

                        process.env.PORT = oldEnvironmentPort;
                    }
                );
            }
        );
    }
);
